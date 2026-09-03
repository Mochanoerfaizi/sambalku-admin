import { db } from "@/lib/db";
import { createSale } from "@/app/actions/sales";

export default async function TambahPenjualan() {
  const products = await db.product.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="page-title mb-6">Tambah Penjualan</h1>
      <form action={createSale} className="card space-y-4 p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold">Produk<select name="productId" className="input mt-2">{products.map(p=><option key={p.id} value={p.id}>{p.name} — Rp {Number(p.sellPrice).toLocaleString("id-ID")}</option>)}</select></label>
          <label className="block text-sm font-semibold">Jumlah<input name="quantity" type="number" min="1" defaultValue="1" className="input mt-2" /></label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold">Channel<select name="channel" className="input mt-2"><option>OFFLINE</option><option>SHOPEE</option><option>TOKOPEDIA</option><option>WHATSAPP</option><option>INSTAGRAM</option></select></label>
          <label className="block text-sm font-semibold">Pembayaran<select name="paymentMethod" className="input mt-2"><option value="CASH">Cash</option><option value="TRANSFER">Transfer</option><option value="QRIS">QRIS</option><option value="MARKETPLACE">Marketplace</option></select></label>
        </div>
        <label className="block text-sm font-semibold">Keterangan<input name="description" className="input mt-2" /></label>
        <button className="btn-primary w-full">Simpan Penjualan</button>
      </form>
    </div>
  );
}