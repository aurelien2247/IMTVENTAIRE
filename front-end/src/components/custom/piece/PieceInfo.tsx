import { usePieceByName, useSaveScan } from "@/hooks/usePiece";
import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Article } from "@/types";
import { useAtom } from "jotai";
import { codeScannedAtom, scanModeAtom } from "@/lib/atoms";
import { useArticle } from "@/hooks/useArticle";
import ScanConfirmDialog from "@/pages/scanner/components/ScanConfirmDialog";
import ArticleList, { ArticleListSkeleton } from "../article/ArticleList";
import ScanMode from "@/pages/scanner/components/ScanMode";
import Error from "@/pages/common/Error";
import ScanPieceButton from "./ScanPieceButton";
import { toast } from "sonner";

interface PieceInfoProps {
  openConfirmScan: boolean;
  setOpenConfirmScan: Dispatch<SetStateAction<boolean>>;
}

export default function PieceInfo({ openConfirmScan, setOpenConfirmScan }: PieceInfoProps) {
  const [scanMode, setScanMode] = useAtom(scanModeAtom);
  const [codeScanned, setCodeScanned] = useAtom(codeScannedAtom);
  const [articlesScanned, setArticlesScanned] = useState<Article[]>([]);

  const changePiece = scanMode ? articlesScanned.length === 0 : true;
  const isPiece = !!codeScanned?.match(/[a-zA-Z]/);

  const { data: piece, isLoading: isLoadingPiece } = usePieceByName(
    codeScanned,
    isPiece && changePiece
  );
  const { data: article, error: articleError } = useArticle(codeScanned, scanMode && !isPiece);
  const { mutate: saveScanMutate } = useSaveScan(
    piece?.id.toString() || "",
    articlesScanned.map((article) => article.num_inventaire)
  );

  useEffect(() => {
    if (scanMode) {
      if (article) {
        setArticlesScanned((articles) => [...articles, article]);
      }
      if (isPiece && codeScanned !== piece?.nom && articlesScanned.length > 0) {
        setOpenConfirmScan(true);
      }
    }
  }, [codeScanned, scanMode, article, piece]);

  useEffect(() => {
    if (articleError) {
      toast.error("Aucun article n'a été trouvé avec ce numéro d'inventaire", {
        position: "top-center",
        richColors: true
      });
    }
  }, [articleError]);

  const saveScan = async () => {
    saveScanMutate();
    resetArticlesScanned();
    if (!isPiece) {
      setCodeScanned(null);
    }
  };

  const resetArticlesScanned = () => {
    setArticlesScanned([]);
    setScanMode(false);
  };

  const handleButtonScan = (startScan: boolean) => {
    if (startScan) {
      setScanMode(startScan);
      return;
    }
    setOpenConfirmScan(true);
  };

  const handleConfirmScan = async (confirm: boolean) => {
    if (confirm) {
      await saveScan();
    }
    setOpenConfirmScan(false);
  };

  const handleQuitScan = () => {
    if (!isPiece) {
      setCodeScanned(null);
    }
    resetArticlesScanned();
    setOpenConfirmScan(false);
  };

  if (isLoadingPiece) {
    return <PieceInfoSkeleton />;
  }

  if (!piece) {
    return <Error />;
  }

  return (
    <div className="container gap-6">
      <div className="flex flex-col gap-1">
        <span>
          {scanMode && <small className="animate-pulse">Scan en cours</small>}
          <h1>
            {piece?.nom || (
              <div className="h-8 w-48 bg-muted animate-pulse rounded" />
            )}
          </h1>
        </span>
      </div>
      {scanMode && piece ? (
        <ScanMode piece={piece} articlesScanned={articlesScanned} />
      ) : (
        <div className="flex flex-col gap-6">
          <p className="text-muted-foreground">Articles dans la pièce</p>
          <ArticleList articles={piece?.articles} />
        </div>
      )}
      <ScanConfirmDialog open={openConfirmScan} onConfirm={handleConfirmScan} onQuit={handleQuitScan} />
      <ScanPieceButton onClick={handleButtonScan} />
    </div>
  );
}

export function PieceInfoSkeleton() {
  return (
    <div className="container gap-6">
      <div className="flex flex-col gap-1">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      </div>
      <div className="flex flex-col gap-6">
          <p className="text-muted-foreground">Articles dans la pièce</p>
          <ArticleListSkeleton />
        </div>
    </div>
  );
}
