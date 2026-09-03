import { createProduct } from "@/app/actions/products";

export default function TambahProduk() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="page-title mb-6">Tambah Produk</h1>
      <form action={createProduct} className="card space-y-4 p-4 sm:p-6">
        <label className="block text-sm font-semibold">Nama Produk<input name="name" required className="input mt-2" placeholder="Sambal Original 150g" /></label>
        <label className="block text-sm font-semibold">SKU<input name="sku" required className="input mt-2" placeholder="SBL-ORG-150" /></label>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm font-semibold">Harga Jual<input name="sellPrice" type="number" min="0" required className="input mt-2" /></label>
          <label className="block text-sm font-semibold">Stok Awal<input name="stock" type="number" min="0" defaultValue="0" className="input mt-2" /></label>
          <label className="block text-sm font-semibold">Min. Stok<input name="minStock" type="number" min="0" defaultValue="5" className="input mt-2" /></label>
        </div>
        <label className="block text-sm font-semibold">Satuan<input name="unit" defaultValue="pcs" className="input mt-2" /></label>
        <button className="btn-primary w-full">Simpan Produk</button>
      </form>
    </div>
  );
}