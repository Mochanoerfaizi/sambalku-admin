import "./globals.css";
import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "SambalKu Admin",
  description: "Admin keuangan dan penjualan bisnis sambal"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen md:flex">
          <Sidebar />
          <main className="min-w-0 flex-1 px-3 py-5 sm:px-5 lg:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}