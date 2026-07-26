import Card from "./Card";

type StatCardProps = {
  title: string;
  value: string | number;
  color?: string;
};

export default function StatCard({
  title,
  value,
  color = "#38bdf8",
}: StatCardProps) {
  return (
    <Card>
      <p className="mb-3 text-sm text-slate-400">
        {title}
      </p>

      <h2
        className="text-3xl font-bold"
        style={{ color }}
      >
        {value}
      </h2>
    </Card>
  );
}