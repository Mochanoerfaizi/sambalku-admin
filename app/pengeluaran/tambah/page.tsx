import { createExpense } from "@/app/actions/expenses";

export default async function TambahPengeluaran() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-extrabold">Tambah Pengeluaran</h1>
      <form action={createExpense} className="card space-y-4 p-6">
        <label className="block text-sm font-semibold">Deskripsi<input name="description" required className="input mt-2" placeholder="Ongkos kirim pesanan" /></label>
        <label className="block text-sm font-semibold">Harga<input name="amount" type="number" min="0" required className="input mt-2" /></label>
        <button className="btn-primary w-full">Simpan Pengeluaran</button>
      </form>
    </div>
  );
}