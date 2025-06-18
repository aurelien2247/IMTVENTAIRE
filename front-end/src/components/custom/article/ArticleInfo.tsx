import { Button } from "@/components/ui/button";
import { useArticle } from "@/hooks/useArticle";
import ArticleEtat, { ArticleEtatSkeleton } from "./ArticleEtat";
import { useAtom } from "jotai";
import { codeScannedAtom } from "@/lib/atoms";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ChangerPiece from "../piece/ChangerPiece";

export default function ArticleInfo() {
  const navigate = useNavigate();
  const [codeScanned] = useAtom(codeScannedAtom);
  const { data: article } = useArticle(codeScanned);
  const [modeChangementPiece, setModeChangementPiece] = useState(false);

  const batimentId = article?.piece?.etage?.batiment?.id;
  const etageId = article?.piece?.etage?.id;
  const pieceId = article?.piece?.id;
  const articleId = article?.num_inventaire;

  if (!article) {
    return <ArticleInfoNotFound />;
  }

  const handleRedirect = () => {
    navigate(`/inventaire/${batimentId}/${etageId}/${pieceId}/${articleId}`);
  };

  if (modeChangementPiece) {
    return <ChangerPiece article={article} onClose={() => setModeChangementPiece(false)} />;
  }

  return (
    <div className="container flex flex-col gap-16">
      <div className="flex flex-col gap-6 min-w-0">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <ArticleEtat etat={article.etat} />
            <h1>{article.categorie.nom}</h1>
          </span>
          <p className="text-muted-foreground">{article.piece.nom}</p>
        </div>
        <div className="flex gap-8 flex-wrap">
          <span className="min-w-0">
            <p className="font-bold truncate w-full">N° d'inventaire</p>
            <p>{article.num_inventaire}</p>
          </span>
          <span className="min-w-0">
            <p className="font-bold truncate w-full">N° de commande</p>
            <p>{article.num_serie}</p>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0">
        <Button onClick={() => setModeChangementPiece(true)}>Changer de pièce</Button>
        <Button
          variant="secondary"
          onClick={handleRedirect}
          disabled={!batimentId || !etageId || !pieceId || !articleId}
        >
          Modifier
        </Button>
      </div>
    </div>
  );
}

export function ArticleInfoSkeleton() {
  return (
    <div className="container flex flex-col gap-16">
      <div className="flex flex-col gap-6 min-w-0">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <ArticleEtatSkeleton />
            <h1>
              <Skeleton className="h-8 w-48 bg-muted animate-pulse rounded" />
            </h1>
          </span>
          <p className="text-muted-foreground">
            <Skeleton className="h-4 w-48 bg-muted animate-pulse rounded" />
          </p>
        </div>
        <div className="flex gap-8 flex-wrap">
          <span className="min-w-0">
            <p className="font-bold truncate w-full">
              <Skeleton className="h-4 w-24 bg-muted animate-pulse rounded" />
            </p>
            <p>
              <Skeleton className="h-4 w-24 bg-muted animate-pulse rounded" />
            </p>
          </span>
          <span className="min-w-0">
            <p className="font-bold truncate w-full">
              <Skeleton className="h-4 w-24 bg-muted animate-pulse rounded" />
            </p>
            <p>
              <Skeleton className="h-4 w-24 bg-muted animate-pulse rounded" />
            </p>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0">
        <Button disabled>
          <Skeleton className="h-10 w-full bg-muted animate-pulse rounded" />
        </Button>
        <Button variant="secondary" disabled>
          <Skeleton className="h-10 w-full bg-muted animate-pulse rounded" />
        </Button>
      </div>
    </div>
  );
}

function ArticleInfoNotFound() {
  const navigate = useNavigate();
  const [codeScanned, setCodeScanned] = useAtom(codeScannedAtom);

  const handleRedirect = () => {
    navigate(`/ajouter?num_inventaire=${codeScanned}`);
  };

  return (
    <div className="container flex flex-col gap-8">
      <div className="flex flex-col gap-6 min-w-0">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <h1>Article non trouvé</h1>
          </span>
          <p className="text-muted-foreground">
            Cet article n'existe pas dans la base de données
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0">
        <Button variant="default" onClick={handleRedirect}>
          Créer un nouvel article
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setCodeScanned(null);
          }}
        >
          Annuler
        </Button>
      </div>
    </div>
  );
}
