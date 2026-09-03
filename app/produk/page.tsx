import { db } from "@/lib/db";
import { rupiah } from "@/lib/format";
import { ProductActions } from "@/components/product-actions";

export default async function ProdukPage() {
  const products = await db.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-7xl">
      <div className="page-header">
        <div><h1 className="page-title">Produk</h1><p className="text-sm text-slate-500">Kelola produk sambal dan stok.</p></div>
        <a href="/produk/tambah" className="btn-primary">+ Tambah Produk</a>
      </div>
      <div className="card overflow-hidden">
        <div className="table-scroll">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500"><tr><th className="p-4">SKU</th><th>Produk</th><th>Harga Jual</th><th>Stok</th><th>Status</th><th className="p-4 text-right">Aksi</th></tr></thead>
            <tbody>
              {products.map(p => <tr key={p.id} className="border-t"><td className="p-4 font-mono">{p.sku}</td><td className="font-semibold">{p.name}</td><td>{rupiah(Number(p.sellPrice))}</td><td>{p.stock} {p.unit}</td><td><span className={`rounded-full px-2 py-1 text-xs ${p.stock <= p.minStock ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>{p.stock <= p.minStock ? "Stok menipis" : "Aman"}</span></td><td className="p-4"><ProductActions productId={p.id} /></td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}