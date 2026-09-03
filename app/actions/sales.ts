"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";

export async function createSale(formData: FormData) {
  const productId = Number(formData.get("productId"));
  const quantity = Number(formData.get("quantity"));
  const channel = String(formData.get("channel") || "OFFLINE");
  const paymentMethod = String(formData.get("paymentMethod") || "CASH") as "CASH" | "TRANSFER" | "QRIS" | "MARKETPLACE";
  const description = String(formData.get("description") || "");

  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product || quantity <= 0 || product.stock < quantity) throw new Error("Stok tidak cukup.");

  const total = quantity * Number(product.sellPrice);
  const isQris = paymentMethod === "QRIS";

  await db.$transaction(async tx => {
    await tx.sale.create({
      data: {
        channel,
        paymentMethod,
        paymentStatus: isQris ? "PENDING" : "PAID",
        paymentReference: isQris ? `QRIS-${randomUUID()}` : undefined,
        paidAt: isQris ? undefined : new Date(),
        description,
        totalAmount: total,
        createdById: 1,
        items: { create: { productId, quantity, unitPrice: product.sellPrice, totalPrice: total } }
      }
    });
    await tx.product.update({ where: { id: productId }, data: { stock: { decrement: quantity } } });
  });

  redirect("/penjualan");
}