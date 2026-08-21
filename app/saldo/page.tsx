import { db } from "@/lib/db";
import { rupiah, dateID } from "@/lib/format";

export default async function SaldoPage() {
  const [sales, purchases, expenses] = await Promise.all([
    db.sale.findMany({ orderBy: { date: "asc" } }),
    db.purchase.findMany({ orderBy: { date: "asc" } }),
    db.expense.findMany({ orderBy: { date: "asc" } })
  ]);

  const dates = new Set([...sales, ...purchases, ...expenses].map(x => new Date(x.date).toISOString().slice(0,10)));
  const rows = [...dates].sort().reverse().map(date => {
    const daySales = sales.filter(x => new Date(x.date).toISOString().slice(0,10) === date).reduce((s,x)=>s+Number(x.totalAmount),0);
    const dayPurchases = purchases.filter(x => new Date(x.date).toISOString().slice(0,10) === date).reduce((s,x)=>s+Number(x.totalAmount),0);
    const dayExpenses = expenses.filter(x => new Date(x.date).toISOString().slice(0,10) === date).reduce((s,x)=>s+Number(x.amount),0);
    return { date, sales: daySales, purchases: dayPurchases, expenses: dayExpenses };
  });

  let running = 0;
  const computed = [...rows].reverse().map(r => {
    running += r.sales - r.purchases - r.expenses;
    return { ...r, balance: running };
  }).reverse();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6"><h1 className="text-3xl font-extrabold">Saldo Harian</h1><p className="text-sm text-slate-500">Saldo = Pendapatan − Modal/Belanja − Pengeluaran lain.</p></div>
      <div className="card overflow-hidden"><table className="w-full text-left text-sm"><thead className="bg-slate-50"><tr><th className="p-4">Tanggal</th><th>Modal</th><th>Pendapatan</th><th>Pengeluaran</th><th className="p-4 text-right">Saldo</th></tr></thead><tbody>{computed.map(r=><tr key={r.date} className="border-t"><td className="p-4">{dateID(r.date)}</td><td>{rupiah(r.purchases)}</td><td className="text-emerald-700">{rupiah(r.sales)}</td><td className="text-orange-700">{rupiah(r.expenses)}</td><td className="p-4 text-right font-black">{rupiah(r.balance)}</td></tr>)}{computed.length===0&&<tr><td colSpan={5} className="p-8 text-center text-slate-500">Belum ada transaksi.</td></tr>}</tbody></table></div>
    </div>
  );
}