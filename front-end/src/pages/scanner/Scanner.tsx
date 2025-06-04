import { BarcodeScanner, type DetectedBarcode } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";
import ScanRectangle from "./components/ScanRectangle";
import { ScanDrawer } from "./components/ScanDrawer";
import { useState, useCallback } from "react";
import ArticleInfo from "@/components/custom/article/ArticleInfo";
import PieceInfo from "@/components/custom/piece/PieceInfo";

export default function Scanner() {
  const [codeScanned, setCodeScanned] = useState<string | null>(null);

  const handleCapture = useCallback((result: DetectedBarcode[]) => {
    setCodeScanned(result[0].rawValue);
  }, []);

  const isPiece = codeScanned?.match(/[a-zA-Z]/);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <BarcodeScanner
        options={{ formats: ["code_128"] }}
        onCapture={handleCapture}
        className="w-full h-full object-cover"
      />
      <ScanRectangle />
      <ScanDrawer
        articleScanned={codeScanned}
        setArticleScanned={setCodeScanned}
      >
        {isPiece ? (
          <PieceInfo pieceName={codeScanned} />
        ) : (
          <ArticleInfo idArticle={codeScanned} />
        )}
      </ScanDrawer>
    </div>
  );
}
