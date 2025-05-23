import { ChevronRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "flex items-center justify-between gap-4 bg-muted rounded-2xl",
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
  label: string;
  link?: string;
  className?: string;
}

export default function Card({ label, link, size, className }: Props) {
  return (
    <div className={cn(cardVariants({ size, className }))}>
      <p className={cn(
        "font-semibold",
        size === "medium" && "text-base",
        size === "small" && "text-sm"
      )}>{label}</p>
      {link && <ChevronRight className="text-muted-foreground" />}
    </div>
  );
}
