import { PropsWithChildren } from "react";

interface TitleAndValueProps extends PropsWithChildren {
  title: string;
  className?: string;
}
export function TitleAndValue({
  title,
  children,
  className,
}: TitleAndValueProps) {
  return (
    <div className="flex flex-col">
      <span className={`text-zinc-400 ${className && className}`}>{title}</span>
      <span>{children}</span>
    </div>
  );
}
