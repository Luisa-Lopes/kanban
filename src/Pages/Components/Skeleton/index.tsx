interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: "sm" | "md" | "lg" | "full";
  count?: number;
  className?: string;
}

const roundStyles = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-xl",
  full: "rounded-full",
};

const Skeleton = ({
  width = "100%",
  height = "1rem",
  rounded = "md",
  count = 1,
  className = "",
}: SkeletonProps) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{ width, height }}
          className={`animate-pulse bg-slate-200 ${roundStyles[rounded]} ${className}`}
        />
      ))}
    </div>
  );
};

export default Skeleton;
