import { ChevronRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const cardVariants = cva(
  "flex items-center justify-between gap-4 bg-muted rounded-2xl hover:bg-muted-foreground/10 transition-colors group cursor-pointer",
  {
    variants: {
      size: {
        medium: "px-6 py-4",
        small: "px-4 py-3",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

interface Props extends VariantProps<typeof cardVariants> {
  content: string | React.ReactNode;
  link?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Card({
  content,
  link,
  size,
  className,
  onClick,
  disabled,
}: Props) {
  const navigate = useNavigate();
  const classes = cn(cardVariants({ size, className, disabled }));

  const handleClick = () => {
    if (disabled) return;
    if (onClick) {
      onClick();
    } else if (link) {
      navigate(link || "");
    }
  };

  return (
    <div className={classes} onClick={handleClick} role="button" tabIndex={0}>
      <p
        className={cn(
          "font-semibold",
          size === "medium" && "text-base",
          size === "small" && "text-sm"
        )}
      >
        {content}
      </p>
      {!disabled && (
        <ChevronRight className="text-muted-foreground transition-transform group-hover:translate-x-1" />
      )}
    </div>
  );
}
