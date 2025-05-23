import { Search } from "lucide-react";
import type { ComponentProps } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

interface Props extends ComponentProps<"form"> {
  label: string;
}

export function SearchBar({ label, ...props }: Props) {
  return (
    <form {...props} className="relative">
      <Label htmlFor="search" className="sr-only">
        {label}
      </Label>
      <Input id="search" placeholder={label} className="pl-8" />
      <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
    </form>
  );
}
