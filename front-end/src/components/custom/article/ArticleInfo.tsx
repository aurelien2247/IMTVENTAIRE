import { Button } from "@/components/ui/button";
import { useArticle, useUpdateArticle } from "@/hooks/useArticle";
import ArticleEtat, { ArticleEtatSkeleton } from "./ArticleEtat";
import { useAtom } from "jotai";
import { codeScannedAtom } from "@/lib/atoms";
import { Skeleton } from "@/components/ui/skeleton";
import Error from "@/pages/common/Error";
import ListeBatiments from "@/pages/inventaire/ListeBatiments";
import ListeEtages from "@/pages/inventaire/ListeEtages";
import ListePieces from "@/pages/inventaire/ListePieces";
import { useState } from "react";

export default function ArticleInfo() {
  const [codeScanned] = useAtom(codeScannedAtom);
  const { data: article } = useArticle(codeScanned);
  const updateArticle = useUpdateArticle();

  // Ajout de l'état pour le mode changement de pièce et la navigation
  const [modeChangementPiece, setModeChangementPiece] = useState(false);
  const [batimentId, setBatimentId] = useState<string | undefined>(undefined);
  const [etageId, setEtageId] = useState<string | undefined>(undefined);
  const [pieceId, setPieceId] = useState<string | undefined>(undefined);

  // Callback pour sélectionner un bâtiment
  const handleSelectBatiment = (id: string) => {
    setBatimentId(id);
    setEtageId(undefined);
    setPieceId(undefined);
  };
  // Callback pour sélectionner un étage
  const handleSelectEtage = (id: string) => {
    setEtageId(id);
    setPieceId(undefined);
  };
  // Callback pour sélectionner une pièce
  const handleSelectPiece = (id: string) => {
    setPieceId(id);
    setModeChangementPiece(false); 
    if (article) {
      updateArticle.mutate({
        numInventaire: article.num_inventaire,
        articleData: { id_piece: id }
      });
    }
  };

  if (!article) {
    return <Error />;
  }

  if (modeChangementPiece) {
    if (!batimentId) {
      return <ListeBatiments onSelect={handleSelectBatiment} title="Déplacer vers..." />;
    } else if (!etageId) {
      return <ListeEtages batimentId={batimentId} onSelect={handleSelectEtage} onBack={() => setBatimentId(undefined)} />;
    } else if (!pieceId) {
      return <ListePieces batimentId={batimentId} etageId={etageId} onSelect={handleSelectPiece} onBack={() => setEtageId(undefined)} />;
    }
  }

  return (
    <div className="container flex flex-col gap-16">
      <h2 className="text-2xl font-bold">Inventaire</h2>
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
        <Button
          onClick={() => {
            setModeChangementPiece(true);
            setBatimentId(undefined);
            setEtageId(undefined);
            setPieceId(undefined);
          }}
        >
          Changer de pièce
        </Button>
        <Button variant="secondary">Modifier</Button>
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
            <h1><Skeleton className="h-8 w-48 bg-muted animate-pulse rounded" /></h1>
          </span>
          <p className="text-muted-foreground"><Skeleton className="h-4 w-48 bg-muted animate-pulse rounded" /></p>
        </div>
        <div className="flex gap-8 flex-wrap">
          <span className="min-w-0">
            <p className="font-bold truncate w-full"><Skeleton className="h-4 w-24 bg-muted animate-pulse rounded" /></p>
            <p><Skeleton className="h-4 w-24 bg-muted animate-pulse rounded" /></p>
          </span>
          <span className="min-w-0">
            <p className="font-bold truncate w-full"><Skeleton className="h-4 w-24 bg-muted animate-pulse rounded" /></p>
            <p><Skeleton className="h-4 w-24 bg-muted animate-pulse rounded" /></p>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-shrink-0">
        <Button disabled><Skeleton className="h-10 w-full bg-muted animate-pulse rounded" /></Button>
        <Button variant="secondary" disabled><Skeleton className="h-10 w-full bg-muted animate-pulse rounded" /></Button>
      </div>
    </div>
  );
}