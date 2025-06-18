import { ChevronRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const cardVariants = cva(
  "flex items-center justify-between gap-4 bg-muted rounded-2xl hover:bg-muted-foreground/10 transition-colors group",
  {
    variants: {
      size: {
        medium: "px-6 py-4",
        small: "px-4 py-3",
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
}

export default function Card({ content, link, size, className, onClick }: Props) {
  const classes = cn(cardVariants({ size, className }));
  if (onClick) {
    return (
      <div className={classes} onClick={onClick} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
        <p
          className={cn(
            "font-semibold",
            size === "medium" && "text-base",
            size === "small" && "text-sm"
          )}
        >
          {content}
        </p>
      </div>
    );
  }
  return (
    <Link to={link || ""} className={classes}>
      <p
        className={cn(
          "font-semibold",
          size === "medium" && "text-base",
          size === "small" && "text-sm"
        )}
      >
        {content}
      </p>
      {link && <ChevronRight className="text-muted-foreground transition-transform group-hover:translate-x-1" />}
    </Link>
  );
}
