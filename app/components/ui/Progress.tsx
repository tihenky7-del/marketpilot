type ProgressProps = {
  value: number;
  color?: string;
};

export default function Progress({
  value,
  color = "#38bdf8",
}: ProgressProps) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900">
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{
          width: `${Math.min(value, 100)}%`,
          background: color,
        }}
      />
    </div>
  );
}