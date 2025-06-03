import { BarcodeScanner, type DetectedBarcode } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";
import ScanRectangle from "./components/ScanRectangle";
import { ScanDrawer } from "./components/ScanDrawer";
import { useState, useCallback } from "react";

export default function Scanner() {
  const [articleScanned, setArticleScanned] = useState<string | null>(null);

  const handleCapture = useCallback((result: DetectedBarcode[]) => {
    setArticleScanned(result[0].rawValue);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <BarcodeScanner
        options={{ formats: ["code_128"] }}
        onCapture={handleCapture}
        className="w-full h-full object-cover"
      />
      <ScanRectangle />
      <ScanDrawer
        articleScanned={articleScanned}
        setArticleScanned={setArticleScanned}
      />
    </div>
  );
}
