import Link from "next/link";
import { notFound } from "next/navigation";
import { updateProduct } from "@/app/actions/products";
import { db } from "@/lib/db";

export default async function EditProduk({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const productId = Number(id);
    const product = await db.product.findUnique({ where: { id: productId } });

    if (!product) notFound();

    return (
        <div className="mx-auto max-w-2xl">
            <div className="page-header"><div><h1 className="page-title">Edit Produk</h1><p className="text-sm text-slate-500">Perbarui informasi dan stok produk.</p></div><Link href="/produk" className="btn-secondary">Batal</Link></div>
            <form action={updateProduct.bind(null, productId)} className="card space-y-4 p-4 sm:p-6">
                <label className="block text-sm font-semibold">Nama Produk<input name="name" required className="input mt-2" defaultValue={product.name} /></label>
                <label className="block text-sm font-semibold">SKU<input name="sku" required className="input mt-2" defaultValue={product.sku} /></label>
                <div className="grid gap-4 sm:grid-cols-3">
                    <label className="block text-sm font-semibold">Harga Jual<input name="sellPrice" type="number" min="0" required className="input mt-2" defaultValue={Number(product.sellPrice)} /></label>
                    <label className="block text-sm font-semibold">Stok<input name="stock" type="number" min="0" className="input mt-2" defaultValue={product.stock} /></label>
                    <label className="block text-sm font-semibold">Min. Stok<input name="minStock" type="number" min="0" className="input mt-2" defaultValue={product.minStock} /></label>
                </div>
                <label className="block text-sm font-semibold">Satuan<input name="unit" defaultValue={product.unit} className="input mt-2" /></label>
                <button className="btn-primary w-full">Simpan Perubahan</button>
            </form>
        </div>
    );
}