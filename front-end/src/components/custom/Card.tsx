import { ChevronRight } from "lucide-react";

interface Props {
  label: string;
  link?: string;
}

export default function Card({ label, link }: Props) {
  return (
    <div className="px-6 py-4 flex justify-between gap-4 bg-muted rounded-2xl">
      <p className="text-base font-semibold">{label}</p>
      {link && <ChevronRight className="text-muted-foreground" />}
    </div>
  );
}
