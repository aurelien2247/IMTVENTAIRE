import { usePieceByName } from "@/hooks/usePieces";
import ScanPieceButton from "./ScanPieceButton";
import { useState } from "react";

interface PieceInfoProps {
  pieceName: string | null;
}

export default function PieceInfo({ pieceName }: PieceInfoProps) {
  const { data: piece } = usePieceByName(pieceName);
  const [isScanning, setIsScanning] = useState(false);

  if (!piece) {
    return null;
  }

  return (
    <div className="container h-screen relative">
      <ScanPieceButton isScanning={isScanning} setIsScanning={setIsScanning} />
      <div className="flex flex-col gap-6 min-w-0">
        <div className="flex flex-col gap-1">
          <span>
            {isScanning && <small className="animate-pulse">Scan en cours</small>}
            <h1>{piece.nom}</h1>
          </span>
          <p>Étage {piece.etage.nom}</p>
        </div>
      </div>
    </div>
  );
}
