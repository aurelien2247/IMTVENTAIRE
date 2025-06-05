import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <div className="flex items-center gap-2">
      <BackButton />
      <h1>{title}</h1>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <BackButton />
      <Skeleton className="h-8 w-48" />
    </div>
  );
}

export function BackButton() {
  return window.location.pathname.split("/").filter(Boolean).length > 1 ? (
    <Link to=".." relative="path" className="hover:opacity-70 transition-opacity">
      <ArrowLeft />
    </Link>
  ) : null;
}
