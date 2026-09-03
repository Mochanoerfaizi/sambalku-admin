import { db } from "@/lib/db";
import { rupiah, dateID } from "@/lib/format";
import { SalesLiveRefresh } from "@/components/sales-live-refresh";

export default async function PenjualanPage() {
  const rows = await db.sale.findMany({ orderBy: { date: "desc" }, take: 50, include: { items: { include: { product: true } } } });
  const total = rows.reduce((s, x) => s + Number(x.totalAmount), 0);
  const pendingQris = rows.filter(x => x.paymentMethod === "QRIS" && x.paymentStatus === "PENDING").length;
  return (
    <div className="mx-auto max-w-7xl">
      <SalesLiveRefresh />
      <div className="page-header"><div><h1 className="page-title">Penjualan</h1><p className="text-sm text-slate-500">Catat semua pendapatan dari penjualan sambal.</p></div><a href="/penjualan/tambah" className="btn-primary w-full sm:w-auto">+ Tambah Penjualan</a></div>
      <div className="mb-5 grid gap-4 sm:grid-cols-2"><div className="card p-5"><div className="text-sm text-slate-500">Total penjualan tercatat</div><div className="mt-1 text-2xl font-black text-emerald-700">{rupiah(total)}</div></div><div className="card p-5"><div className="text-sm text-slate-500">QRIS menunggu pembayaran</div><div className="mt-1 text-2xl font-black text-amber-600">{pendingQris}</div></div></div>
      <div className="card overflow-hidden"><div className="table-scroll"><table className="w-full text-left text-sm"><thead className="bg-slate-50"><tr><th className="p-4">Tanggal</th><th>Channel</th><th>Metode</th><th>Status</th><th>Item</th><th className="p-4 text-right">Total</th></tr></thead><tbody>{rows.map(x => <tr key={x.id} className="border-t"><td className="p-4">{dateID(x.date)}</td><td>{x.channel}</td><td>{x.paymentMethod}</td><td><span className={x.paymentStatus === "PAID" ? "font-semibold text-emerald-700" : x.paymentStatus === "PENDING" ? "font-semibold text-amber-600" : "font-semibold text-red-600"}>{x.paymentStatus === "PAID" ? "LUNAS" : x.paymentStatus === "PENDING" ? "MENUNGGU" : x.paymentStatus}</span></td><td>{x.items.map(i => `${i.product.name} × ${i.quantity}`).join(", ")}</td><td className="p-4 text-right font-bold">{rupiah(Number(x.totalAmount))}</td></tr>)}</tbody></table></div></div>
    </div>
  );
}