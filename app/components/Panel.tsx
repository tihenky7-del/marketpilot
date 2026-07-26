import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  style?: React.CSSProperties;
};

export default function Panel({
  children,
  style,
}: PanelProps) {
  return (
    <div
      style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: "18px",
        padding: "25px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}