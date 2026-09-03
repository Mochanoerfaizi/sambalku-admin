import { createPurchase } from "@/app/actions/purchases";

export default async function TambahModal() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="page-title mb-6">Tambah Modal / Belanja</h1>
      <form action={createPurchase} className="card space-y-4 p-4 sm:p-6">
        <label className="block text-sm font-semibold">Nama Barang<input name="itemName" required className="input mt-2" placeholder="Contoh: Cabai rawit" /></label>
        <label className="block text-sm font-semibold">Harga<input name="totalAmount" type="number" min="0" required className="input mt-2" /></label>
        <button className="btn-primary w-full">Simpan Pembelian</button>
      </form>
    </div>
  );
}