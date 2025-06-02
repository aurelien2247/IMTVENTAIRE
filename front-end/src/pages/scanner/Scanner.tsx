import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

export default function Scanner() {
  return <BarcodeScanner options={{ formats: ['code_128'] }} onCapture={(result) => {
    console.log(result);
  }} />;
}