import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

export default function Scanner() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <BarcodeScanner
        options={{ formats: ["code_128"] }}
        onCapture={(result) => {
          console.log(result);
        }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
