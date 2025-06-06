import { usePieceByName } from "@/hooks/usePieces";
import { useState, useEffect } from "react";
import type { Article } from "@/types";
import { useAtom } from "jotai";
import { codeScannedAtom, scanModeAtom } from "@/lib/atoms";
import { useArticle } from "@/hooks/useArticles";
import ScanConfirmDialog from "@/pages/scanner/components/ScanConfirmDialog";
import ArticleList, { ArticleListSkeleton } from "../article/ArticleList";
import ScanMode from "@/pages/scanner/components/ScanMode";
import Error from "@/pages/common/Error";

export default function PieceInfo() {
  const [scanMode, setScanMode] = useAtom(scanModeAtom);
  const [codeScanned, setCodeScanned] = useAtom(codeScannedAtom);
  const [articlesScanned, setArticlesScanned] = useState<Article[]>([]);
  const [openConfirmScan, setOpenConfirmScan] = useState(false);

  const changePiece = scanMode ? articlesScanned.length === 0 : true;
  const isPiece = !!codeScanned?.match(/[a-zA-Z]/);

  const { data: piece, isLoading: isLoadingPiece } = usePieceByName(
    codeScanned,
    isPiece && changePiece
  );
  const { data: article } = useArticle(codeScanned, scanMode && !isPiece);

  useEffect(() => {
    if (scanMode && article) {
      // setChangePiece(false);
      setArticlesScanned((articles) => [...articles, article]);
    } 
    if (codeScanned !== piece?.nom && scanMode && articlesScanned.length > 0) {
      setOpenConfirmScan(true);
    }
    if (codeScanned !== piece?.nom) {
      resetArticlesScanned()
    }
  }, [codeScanned, scanMode, article]);

  const saveScan = async () => {
    // TODO: Enregistrer les articles sauvegardées dans le back
    console.log(articlesScanned);
  };

  const resetArticlesScanned = () => {
    setArticlesScanned([]);
    setScanMode(false);
  };

  const handleConfirmScan = async (confirm: boolean) => {
    if (confirm) {
      await saveScan();
      resetArticlesScanned();
      // setChangePiece(true);
    }
    setOpenConfirmScan(false);
  };

  if (isLoadingPiece) {
    return <PieceInfoSkeleton />;
  }

  if (!piece) {
    return (
      <Error />
    )
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
        <ArticleList articles={piece?.articles} />
      )}
      <ScanConfirmDialog open={openConfirmScan} onConfirm={handleConfirmScan} />
    </div>
  );
}

export function PieceInfoSkeleton() {
  return (
    <div className="container gap-6">
      <div className="flex flex-col gap-1">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      </div>
      <ArticleListSkeleton />
    </div>
  );
}
