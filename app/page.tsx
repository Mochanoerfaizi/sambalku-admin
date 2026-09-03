import { db } from "@/lib/db";
import { rupiah, dateID } from "@/lib/format";
import { StatCard } from "@/components/stat-card";

export default async function Dashboard() {
  const [sales, purchases, expenses, products, recentSales] = await Promise.all([
    db.sale.aggregate({ _sum: { totalAmount: true } }),
    db.purchase.aggregate({ _sum: { totalAmount: true } }),
    db.expense.aggregate({ _sum: { amount: true } }),
    db.product.findMany({ orderBy: { stock: "asc" }, take: 5 }),
    db.sale.findMany({ orderBy: { date: "desc" }, take: 5, include: { items: { include: { product: true } } } })
  ]);

  const totalSales = Number(sales._sum.totalAmount ?? 0);
  const totalCapital = Number(purchases._sum.totalAmount ?? 0);
  const totalExpenses = Number(expenses._sum.amount ?? 0);
  const balance = totalSales - totalCapital - totalExpenses;

  return (
    <div className="mx-auto max-w-7xl">
      <header className="page-header">
        <div>
          <p className="text-sm font-medium text-red-600">Sistem Admin</p>
          <h1 className="page-title">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Pantau modal, penjualan, pengeluaran, dan saldo usaha.</p>
        </div>
        <div className="w-fit rounded-xl border bg-white px-4 py-2 text-sm">{dateID(new Date())}</div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Modal / Belanja" value={rupiah(totalCapital)} tone="red" />
        <StatCard title="Total Pendapatan" value={rupiah(totalSales)} tone="green" />
        <StatCard title="Total Pengeluaran" value={rupiah(totalExpenses)} tone="orange" />
        <StatCard title="Saldo Akhir" value={rupiah(balance)} tone="blue" />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <h2 className="font-bold">Ringkasan Keuangan</h2>
          <div className="mt-5 grid h-56 place-items-center rounded-xl bg-gradient-to-br from-red-50 via-white to-orange-50 text-center">
            <div>
              <div className="text-3xl font-black text-red-700 sm:text-5xl">{rupiah(balance)}</div>
              <div className="mt-2 text-sm text-slate-500">Saldo bersih berdasarkan seluruh transaksi</div>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="font-bold">Stok Terendah</h2>
          <div className="mt-4 space-y-3">
            {products.length === 0 && <p className="text-sm text-slate-500">Belum ada produk.</p>}
            {products.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="text-sm font-medium">{p.name}</span>
                <span className={`font-bold ${p.stock <= p.minStock ? "text-red-600" : "text-slate-700"}`}>{p.stock} {p.unit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card mt-6 overflow-hidden">
        <div className="border-b p-5">
          <h2 className="font-bold">Penjualan Terbaru</h2>
        </div>
        <div className="table-scroll">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr><th className="px-5 py-3">Tanggal</th><th>Channel</th><th>Item</th><th className="px-5 text-right">Total</th></tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id} className="border-t">
                  <td className="px-5 py-3">{dateID(sale.date)}</td>
                  <td>{sale.channel}</td>
                  <td>{sale.items.map(i => `${i.product.name} (${i.quantity})`).join(", ")}</td>
                  <td className="px-5 text-right font-bold">{rupiah(Number(sale.totalAmount))}</td>
                </tr>
              ))}
              {recentSales.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-slate-500">Belum ada transaksi.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}