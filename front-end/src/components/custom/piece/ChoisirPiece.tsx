import ListeBatiments from "@/pages/inventaire/ListeBatiments";
import ListeEtages from "@/pages/inventaire/ListeEtages";
import ListePieces from "@/pages/inventaire/ListePieces";
import { useState, useEffect } from "react";
import Header from "../Header";
import { useSetAtom } from "jotai";
import {
  pieceSelectedAtom,
  searchPiecesOnly,
  searchQueryAtom,
} from "@/lib/atoms";

export default function ChoisirPiece() {
  const [batimentId, setBatimentId] = useState<string | undefined>(undefined);
  const [etageId, setEtageId] = useState<string | undefined>(undefined);
  const [step, setStep] = useState<"batiment" | "etage" | "piece">("batiment");
  const setModeChangementPiece = useSetAtom(searchPiecesOnly);
  const setPieceSelected = useSetAtom(pieceSelectedAtom);
  const setQuery = useSetAtom(searchQueryAtom);

  //On passe à une recherche par salle uniquement (var globale)
  useEffect(() => {
    setModeChangementPiece(true);
    return () => setModeChangementPiece(false);
  }, [setModeChangementPiece]);

  const handleSelectBatiment = (id: string) => {
    setBatimentId(id);
    setStep("etage");
    setEtageId(undefined);
  };
  const handleSelectEtage = (id: string) => {
    setEtageId(id);
    setStep("piece");
  };
  const handleSelectPiece = (id: string) => {
    setPieceSelected(id);
    setModeChangementPiece(false); //On ferme la fenetre
  };

  const handleBack = () => {
    switch (step) {
      case "piece":
        setStep("etage");
        break;
      case "etage":
        setStep("batiment");
        break;
      case "batiment":
        setModeChangementPiece(false); //On ferme la fenetre
        setQuery("");
        break;
    }
  };

  return (
    <div className="container flex flex-col gap-6">
      <Header title="Choisir une pièce" onBack={handleBack} />

      {step === "batiment" && (
        <ListeBatiments onSelect={handleSelectBatiment} />
      )}
      {step === "etage" && batimentId && (
        <ListeEtages batimentId={batimentId} onSelect={handleSelectEtage} />
      )}
      {step === "piece" && batimentId && etageId && (
        <ListePieces
          batimentId={batimentId}
          etageId={etageId}
          onSelect={handleSelectPiece}
        />
      )}
    </div>
  );
}
