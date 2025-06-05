import { BarcodeScanner, type DetectedBarcode } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";
import ScanRectangle from "./components/ScanRectangle";
import { ScanDrawer } from "./components/ScanDrawer";
import { useCallback } from "react";
import ArticleInfo from "@/components/custom/article/ArticleInfo";
import PieceInfo from "@/components/custom/piece/PieceInfo";
import { useAtom } from "jotai";
import { codeScannedAtom, scanModeAtom } from "@/lib/atoms";
import ScanPieceButton from "@/components/custom/piece/ScanPieceButton";

export default function Scanner() {
  const [codeScanned, setCodeScanned] = useAtom(codeScannedAtom);
  const [scanMode] = useAtom(scanModeAtom);

  const handleCapture = useCallback(
    (result: DetectedBarcode[]) => {
      setCodeScanned(result[0].rawValue);
    },
    [setCodeScanned]
  );

  const isPiece = scanMode || codeScanned?.match(/[a-zA-Z]/);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <BarcodeScanner
        options={{ formats: ["code_128"] }}
        onCapture={handleCapture}
        className="w-full h-full object-cover"
      />
      <ScanRectangle />
      <ScanDrawer>
        {isPiece ? (
          <>
            <PieceInfo />
            <ScanPieceButton />
          </>
        ) : (
          <ArticleInfo />
        )}
      </ScanDrawer>
    </div>
  );
}
