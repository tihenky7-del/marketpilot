import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "30px",
      }}
    >
      <div>
        <h1
          style={{
            margin: "0 0 10px",
            fontSize: "40px",
          }}
        >
          {title}
        </h1>

        {description && (
          <p
            style={{
              margin: 0,
              color: "#94a3b8",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}