import { Skeleton } from "@/components/ui/skeleton";
import { EtatEnum, type Etat } from "@/types";

interface ArticleEtatProps {
  etat: Etat;
}

export default function ArticleEtat({ etat }: ArticleEtatProps) {
  const getEtatColor = (etat: Etat) => {
    switch (etat.id) {
      case EtatEnum.Neuf:
        return "bg-green-500";
      case EtatEnum["Bon état"]:
        return "bg-green-400";
      case EtatEnum["Mauvais état"]:
        return "bg-yellow-500";
      case EtatEnum["En attente de destruction"]:
        return "bg-orange-500";
      case EtatEnum.Détruit:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2.5 h-2.5 rounded-full ${getEtatColor(etat)}`}
        title={EtatEnum[etat.id]}
        aria-label={etat.nom}
      />
    </div>
  );
}

export function ArticleEtatSkeleton() {
  return <Skeleton className="w-2.5 h-2.5 aspect-square rounded-full" />;
}
