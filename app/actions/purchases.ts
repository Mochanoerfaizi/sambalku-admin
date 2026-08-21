"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createPurchase(formData: FormData) {
  const itemName = String(formData.get("itemName") || "").trim();
  const totalAmount = Number(formData.get("totalAmount"));

  if (!itemName || !Number.isFinite(totalAmount) || totalAmount < 0) throw new Error("Data pembelian tidak valid.");

  await db.purchase.create({
    data: {
      itemName,
      totalAmount,
      createdById: 1
    }
  });

  redirect("/modal");
}

export async function deletePurchase(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) throw new Error("Data pembelian tidak valid.");

  await db.purchase.delete({ where: { id } });

  redirect("/modal");
}