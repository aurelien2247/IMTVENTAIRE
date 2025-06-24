import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

interface Props {
  title: string;
  onBack?: () => void;
}

export default function Header({ title, onBack }: Props) {
  return (
    <div className="flex items-center gap-2">
      <BackButton onBack={onBack} />
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

interface BackButtonProps {
  onBack?: () => void;
}

export function BackButton({ onBack }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  return onBack ||
    window.location.pathname.split("/").filter(Boolean).length > 1 ? (
    <ArrowLeft
      onClick={handleBack}
      className="hover:opacity-70 transition-opacity cursor-pointer"
    />
  ) : null;
}
