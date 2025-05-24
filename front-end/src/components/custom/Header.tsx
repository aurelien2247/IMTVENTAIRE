import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <div className="flex items-center gap-2">
      {window.location.pathname.split('/').filter(Boolean).length > 1 && (
        <Link
          to=".."
          relative="path"
          className="hover:opacity-70 transition-opacity"
        >
          <ArrowLeft />
        </Link>
      )}
      <h1>{title}</h1>
    </div>
  );
}
