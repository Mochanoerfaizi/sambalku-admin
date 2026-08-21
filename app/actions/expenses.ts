"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createExpense(formData: FormData) {
  const description = String(formData.get("description") || "").trim();
  const amount = Number(formData.get("amount") || 0);

  if (!description || !Number.isFinite(amount) || amount <= 0) throw new Error("Data pengeluaran tidak valid.");

  await db.expense.create({
    data: { description, amount, createdById: 1 }
  });

  redirect("/pengeluaran");
}

export async function deleteExpense(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) throw new Error("Data pengeluaran tidak valid.");

  await db.expense.delete({ where: { id } });

  redirect("/pengeluaran");
}