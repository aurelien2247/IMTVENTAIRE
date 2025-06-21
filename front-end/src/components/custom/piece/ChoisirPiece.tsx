import ListeBatiments from "@/pages/inventaire/ListeBatiments";
import ListeEtages from "@/pages/inventaire/ListeEtages";
import ListePieces from "@/pages/inventaire/ListePieces";
import { useState } from "react";
import { useUpdateArticle } from "@/hooks/useArticle";
import type { Article } from "@/types";
import Header from "../Header";

interface ChoisirPieceProps {
  article: Article;
  onClose: () => void;
}

export default function ChoisirPiece({ article, onClose }: ChoisirPieceProps) {
  const updateArticle = useUpdateArticle();
  const [batimentId, setBatimentId] = useState<string | undefined>(undefined);
  const [etageId, setEtageId] = useState<string | undefined>(undefined);
  const [step, setStep] = useState<'batiment' | 'etage' | 'piece'>('batiment');

  const handleSelectBatiment = (id: string) => {
    setBatimentId(id);
    setStep('etage');
    setEtageId(undefined);
  };
  const handleSelectEtage = (id: string) => {
    setEtageId(id);
    setStep('piece');
  };
  const handleSelectPiece = (id: string) => {
    updateArticle.mutate({
      articleId: article.num_inventaire,
      data: {
        num_inventaire: article.num_inventaire,
        num_serie: article.num_serie,
        categorie: article.categorie.id.toString(),
        etat: article.etat.id.toString(),
        id_piece: id,
        num_bon_commande: article.num_bon_commande,
        fournisseur: article.fournisseur,
        code_fournisseur: article.code_fournisseur?.toString(),
        marque: article.marque,
      },
    });
    onClose();
  };

  const handleBack = () => {
    switch (step) {
      case 'piece':
        setStep('etage');
        break;
      case 'etage':
        setStep('batiment');
        break;
      case 'batiment':
        onClose();
        break;
    }
  };

  return (
    <div className="container flex flex-col gap-6">
      <Header title="Choisir une pièce" onBack={handleBack} />
      <div>
        {step === 'batiment' && (
          <ListeBatiments onSelect={handleSelectBatiment} />
        )}
        {step === 'etage' && batimentId && (
          <ListeEtages batimentId={batimentId} onSelect={handleSelectEtage} />
        )}
        {step === 'piece' && batimentId && etageId && (
          <ListePieces batimentId={batimentId} etageId={etageId} onSelect={handleSelectPiece} />
        )}
      </div>
    </div>
  );
}
