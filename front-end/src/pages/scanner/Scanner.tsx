import { BarcodeScanner, type DetectedBarcode } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";
import ScanRectangle from "./components/ScanRectangle";
import { ScanDrawer } from "./components/ScanDrawer";
import { useCallback, useState } from "react";
import ArticleInfo from "@/components/custom/article/ArticleInfo";
import PieceInfo from "@/components/custom/piece/PieceInfo";
import { useAtom } from "jotai";
import { codeScannedAtom, scanModeAtom } from "@/lib/atoms";
import { toast } from "sonner";

export default function Scanner() {
  const [codeScanned, setCodeScanned] = useAtom(codeScannedAtom);
  const [scanMode] = useAtom(scanModeAtom);
  const [openConfirmScan, setOpenConfirmScan] = useState(false);
  const soundPath = new URL('../../assets/sound/scan-article.mp3', import.meta.url).href;
  const audio = new Audio(soundPath);

  const handleCapture = useCallback(
    (result: DetectedBarcode[]) => {
      const code = result[0].rawValue;
      if (code === codeScanned) {
        toast.error("Vous avez déjà scanné cet article", {
          position: "top-center",
          richColors: true
        });
      }
      setCodeScanned(code);
      audio.play();
    },
    [setCodeScanned]
  );

  const handleCloseDrawer = () => {
    if (scanMode) {
      setOpenConfirmScan(true);
    } else {
      setCodeScanned(null);
    }
  };

  const isPiece = scanMode || codeScanned?.match(/[a-zA-Z]/);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <BarcodeScanner
        options={{ formats: ["code_128"] }}
        onCapture={handleCapture}
        className="w-full h-full object-cover"
      />
      <ScanRectangle />
      <ScanDrawer onClose={handleCloseDrawer}>
        {isPiece ? (
          <PieceInfo openConfirmScan={openConfirmScan} setOpenConfirmScan={setOpenConfirmScan} />
        ) : (
          <ArticleInfo />
        )}
      </ScanDrawer>
    </div>
  );
}
