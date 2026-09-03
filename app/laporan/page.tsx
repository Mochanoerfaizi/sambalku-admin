import { db } from "@/lib/db";
import { rupiah } from "@/lib/format";

export default async function LaporanPage() {
  const [sales, purchases, expenses] = await Promise.all([
    db.sale.aggregate({ _sum: { totalAmount: true } }),
    db.purchase.aggregate({ _sum: { totalAmount: true } }),
    db.expense.aggregate({ _sum: { amount: true } })
  ]);
  const totalSales = Number(sales._sum.totalAmount ?? 0);
  const totalPurchases = Number(purchases._sum.totalAmount ?? 0);
  const totalExpenses = Number(expenses._sum.amount ?? 0);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6"><h1 className="page-title">Laporan</h1><p className="text-sm text-slate-500">Ringkasan performa keuangan usaha.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="card p-5 sm:p-6"><div className="text-sm text-slate-500">Pendapatan</div><div className="mt-2 text-2xl font-black text-emerald-700">{rupiah(totalSales)}</div></div>
        <div className="card p-5 sm:p-6"><div className="text-sm text-slate-500">Modal / Belanja</div><div className="mt-2 text-2xl font-black text-red-700">{rupiah(totalPurchases)}</div></div>
        <div className="card p-5 sm:p-6"><div className="text-sm text-slate-500">Pengeluaran Lain</div><div className="mt-2 text-2xl font-black text-orange-700">{rupiah(totalExpenses)}</div></div>
      </div>
      <div className="card mt-6 p-5 sm:p-8">
        <div className="text-sm text-slate-500">Saldo Bersih</div>
        <div className="mt-2 text-3xl font-black sm:text-4xl">{rupiah(totalSales-totalPurchases-totalExpenses)}</div>
        <p className="mt-3 text-sm text-slate-500">Versi berikutnya dapat ditambahkan filter tanggal, grafik bulanan, export Excel/PDF, dan laporan laba rugi.</p>
      </div>
    </div>
  );
}