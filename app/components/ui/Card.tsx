type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}