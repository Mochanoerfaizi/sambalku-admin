"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2, ClipboardList } from "lucide-react";
import { useState } from "react";
import { deleteProduct } from "@/app/actions/products";

export function ProductActions({ productId }: { productId: number }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative flex justify-end">
            <button
                type="button"
                title="Lihat aksi produk"
                aria-label="Lihat aksi produk"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
                <Eye size={18} />
            </button>
            {open && (
                <div className="absolute right-0 top-11 z-20 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                    <Link href={`/produk/${productId}`} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                        <ClipboardList size={16} /> Review
                    </Link>
                    <Link href={`/produk/${productId}/edit`} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                        <Pencil size={16} /> Edit
                    </Link>
                    <form action={deleteProduct.bind(null, productId)} onSubmit={(event) => {
                        if (!window.confirm("Hapus produk ini?")) event.preventDefault();
                    }}>
                        <button type="submit" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                            <Trash2 size={16} /> Hapus
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}