import Progress from "./Progress";

type StatusRowProps = {
  title: string;
  value: number;
  total: number;
  color?: string;
};

export default function StatusRow({
  title,
  value,
  total,
  color = "#38bdf8",
}: StatusRowProps) {
  const percent =
    total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between">
        <span>{title}</span>

        <strong>
          {value} · {percent}%
        </strong>
      </div>

      <Progress value={percent} color={color} />
    </div>
  );
}