// src/components/common/Card.tsx
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  action,
  children,
  className = "",
  noPadding = false,
}) => {
  return (
    <div className={`bg-white rounded-3xl shadow ${className}`}>
      {title && (
        <div className="flex justify-between items-center px-6 pt-6 pb-4">
          <h3 className="text-lg font-semibold text-primary-title">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPadding ? "" : "p-6 pt-0"}>{children}</div>
    </div>
  );
};

export default Card;
