import { db } from "@/lib/db";
import { rupiah, dateID } from "@/lib/format";
import { deletePurchase } from "@/app/actions/purchases";

export default async function ModalPage() {
  const rows = await db.purchase.findMany({ orderBy: { date: "desc" }, take: 50 });
  const total = rows.reduce((s, x) => s + Number(x.totalAmount), 0);
  return (
    <div className="mx-auto max-w-7xl">
      <div className="page-header"><div><h1 className="page-title">Modal / Belanja</h1><p className="text-sm text-slate-500">Catat pembelian bahan, kemasan, dan kebutuhan produksi.</p></div><a href="/modal/tambah" className="btn-primary w-full sm:w-auto">+ Tambah Belanja</a></div>
      <div className="card mb-5 p-5"><div className="text-sm text-slate-500">Total yang tercatat</div><div className="mt-1 text-2xl font-black">{rupiah(total)}</div></div>
      <div className="card overflow-hidden"><div className="table-scroll"><table className="w-full text-left text-sm"><thead className="bg-slate-50"><tr><th className="p-4">Tanggal</th><th>Nama Barang</th><th className="text-right p-4">Harga</th><th className="p-4 text-right">Aksi</th></tr></thead><tbody>{rows.map(x => <tr key={x.id} className="border-t"><td className="p-4">{dateID(x.date)}</td><td>{x.itemName}</td><td className="p-4 text-right font-bold">{rupiah(Number(x.totalAmount))}</td><td className="p-4 text-right"><form action={deletePurchase}><input type="hidden" name="id" value={x.id} /><button type="submit" className="font-semibold text-red-600 hover:text-red-800">Hapus</button></form></td></tr>)}</tbody></table></div></div>
    </div>
  );
}