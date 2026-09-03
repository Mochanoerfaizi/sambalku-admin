import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { rupiah } from "@/lib/format";

export default async function ReviewProduk({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await db.product.findUnique({ where: { id: Number(id) } });

    if (!product) notFound();

    return (
        <div className="mx-auto max-w-2xl">
            <div className="page-header">
                <div><h1 className="page-title">Review Produk</h1><p className="text-sm text-slate-500">Ringkasan informasi produk.</p></div>
                <Link href="/produk" className="btn-secondary">Kembali</Link>
            </div>
            <div className="card divide-y divide-slate-100">
                <div className="p-5"><p className="text-sm text-slate-500">Nama Produk</p><p className="mt-1 text-xl font-bold">{product.name}</p></div>
                <div className="grid gap-5 p-5 sm:grid-cols-2">
                    <div><p className="text-sm text-slate-500">SKU</p><p className="mt-1 font-mono">{product.sku}</p></div>
                    <div><p className="text-sm text-slate-500">Harga Jual</p><p className="mt-1 font-semibold">{rupiah(Number(product.sellPrice))}</p></div>
                    <div><p className="text-sm text-slate-500">Stok</p><p className="mt-1 font-semibold">{product.stock} {product.unit}</p></div>
                    <div><p className="text-sm text-slate-500">Batas Stok Minimum</p><p className="mt-1 font-semibold">{product.minStock} {product.unit}</p></div>
                </div>
            </div>
        </div>
    );
}