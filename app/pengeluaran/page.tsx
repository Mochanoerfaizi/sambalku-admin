import { db } from "@/lib/db";
import { rupiah, dateID } from "@/lib/format";
import { deleteExpense } from "@/app/actions/expenses";

export default async function PengeluaranPage() {
  const rows = await db.expense.findMany({ orderBy: { date: "desc" }, take: 50 });
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between"><div><h1 className="text-3xl font-extrabold">Pengeluaran Lain</h1><p className="text-sm text-slate-500">Ongkir, listrik, gas, kemasan, dan biaya lainnya.</p></div><a href="/pengeluaran/tambah" className="btn-primary">+ Tambah Pengeluaran</a></div>
      <div className="card overflow-hidden"><table className="w-full text-left text-sm"><thead className="bg-slate-50"><tr><th className="p-4">Tanggal</th><th>Deskripsi</th><th className="p-4 text-right">Harga</th><th className="p-4 text-right">Aksi</th></tr></thead><tbody>{rows.map(x => <tr key={x.id} className="border-t"><td className="p-4">{dateID(x.date)}</td><td>{x.description}</td><td className="p-4 text-right font-bold text-orange-700">{rupiah(Number(x.amount))}</td><td className="p-4 text-right"><form action={deleteExpense}><input type="hidden" name="id" value={x.id} /><button type="submit" className="font-semibold text-red-600 hover:text-red-800">Hapus</button></form></td></tr>)}</tbody></table></div>
    </div>
  );
}