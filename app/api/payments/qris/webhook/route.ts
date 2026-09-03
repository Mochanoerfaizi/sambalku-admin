import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

function validSignature(rawBody: string, signature: string | null) {
    const secret = process.env.QRIS_WEBHOOK_SECRET;
    if (!secret || !signature) return false;
    const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
    const received = Buffer.from(signature, "utf8");
    const calculated = Buffer.from(expected, "utf8");
    return received.length === calculated.length && timingSafeEqual(received, calculated);
}

export async function POST(request: Request) {
    const rawBody = await request.text();
    if (!validSignature(rawBody, request.headers.get("x-webhook-signature"))) {
        return Response.json({ error: "Signature tidak valid" }, { status: 401 });
    }

    let body: { eventId?: string; paymentReference?: string; status?: string; amount?: number };
    try {
        body = JSON.parse(rawBody);
    } catch {
        return Response.json({ error: "Payload JSON tidak valid" }, { status: 400 });
    }

    const eventId = body.eventId?.trim();
    const paymentReference = body.paymentReference?.trim();
    const status = body.status?.toUpperCase();
    if (!eventId || !paymentReference || !status || !["PAID", "FAILED", "EXPIRED"].includes(status)) {
        return Response.json({ error: "Payload pembayaran tidak lengkap" }, { status: 400 });
    }

    const existingEvent = await db.paymentEvent.findUnique({ where: { providerEventId: eventId } });
    if (existingEvent) return Response.json({ received: true, duplicate: true });

    const sale = await db.sale.findUnique({ where: { paymentReference } });
    if (!sale || sale.paymentMethod !== "QRIS") {
        return Response.json({ error: "Reference pembayaran tidak ditemukan" }, { status: 404 });
    }
    if (body.amount !== undefined && Number(sale.totalAmount) !== Number(body.amount)) {
        return Response.json({ error: "Nominal pembayaran tidak sesuai" }, { status: 400 });
    }

    await db.$transaction(async tx => {
        await tx.paymentEvent.create({ data: { providerEventId: eventId, paymentReference, status, payload: body } });
        await tx.sale.update({
            where: { id: sale.id },
            data: { paymentStatus: status as "PAID" | "FAILED" | "EXPIRED", paidAt: status === "PAID" ? new Date() : null }
        });
    });
    revalidatePath("/penjualan");
    return Response.json({ received: true });
}