import { db } from "@/lib/db";
import { rupiah, dateID } from "@/lib/format";

export default async function PenjualanPage() {
  const rows = await db.sale.findMany({ orderBy: { date: "desc" }, take: 50, include: { items: { include: { product: true } } } });
  const total = rows.reduce((s, x) => s + Number(x.totalAmount), 0);
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between"><div><h1 className="text-3xl font-extrabold">Penjualan</h1><p className="text-sm text-slate-500">Catat semua pendapatan dari penjualan sambal.</p></div><a href="/penjualan/tambah" className="btn-primary">+ Tambah Penjualan</a></div>
      <div className="card mb-5 p-5"><div className="text-sm text-slate-500">Total penjualan tercatat</div><div className="mt-1 text-2xl font-black text-emerald-700">{rupiah(total)}</div></div>
      <div className="card overflow-hidden"><table className="w-full text-left text-sm"><thead className="bg-slate-50"><tr><th className="p-4">Tanggal</th><th>Channel</th><th>Metode</th><th>Item</th><th className="p-4 text-right">Total</th></tr></thead><tbody>{rows.map(x=><tr key={x.id} className="border-t"><td className="p-4">{dateID(x.date)}</td><td>{x.channel}</td><td>{x.paymentMethod}</td><td>{x.items.map(i=>`${i.product.name} × ${i.quantity}`).join(", ")}</td><td className="p-4 text-right font-bold">{rupiah(Number(x.totalAmount))}</td></tr>)}</tbody></table></div>
    </div>
  );
}