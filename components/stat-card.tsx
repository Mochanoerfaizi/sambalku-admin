export function StatCard({
  title, value, note, tone = "red"
}: {
  title: string; value: string; note?: string; tone?: "red" | "green" | "blue" | "orange";
}) {
  const styles = {
    red: "bg-red-50 text-red-700",
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-700"
  }[tone];

  return (
    <div className="card p-5">
      <div className={`mb-4 inline-flex rounded-xl px-3 py-2 text-xs font-bold ${styles}`}>{title}</div>
      <div className="text-2xl font-extrabold tracking-tight">{value}</div>
      {note && <div className="mt-1 text-xs text-slate-500">{note}</div>}
    </div>
  );
}