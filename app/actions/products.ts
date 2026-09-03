"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") || "");
  const sku = String(formData.get("sku") || "");
  const unit = String(formData.get("unit") || "pcs");
  const sellPrice = Number(formData.get("sellPrice") || 0);
  const stock = Number(formData.get("stock") || 0);
  const minStock = Number(formData.get("minStock") || 5);

  if (!name || !sku) throw new Error("Nama dan SKU wajib diisi.");

  await db.product.create({ data: { name, sku, unit, sellPrice, stock, minStock } });
  redirect("/produk");
}

export async function updateProduct(id: number, formData: FormData) {
  const name = String(formData.get("name") || "");
  const sku = String(formData.get("sku") || "");
  const unit = String(formData.get("unit") || "pcs");
  const sellPrice = Number(formData.get("sellPrice") || 0);
  const stock = Number(formData.get("stock") || 0);
  const minStock = Number(formData.get("minStock") || 5);

  if (!name || !sku) throw new Error("Nama dan SKU wajib diisi.");

  await db.product.update({ where: { id }, data: { name, sku, unit, sellPrice, stock, minStock } });
  redirect("/produk");
}

export async function deleteProduct(id: number) {
  await db.product.delete({ where: { id } });
  redirect("/produk");
}