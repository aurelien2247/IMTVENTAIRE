import { Button } from "@/components/ui/button";
import { scanModeAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { CheckIcon, ScanIcon } from "lucide-react";

export default function ScanPieceButton() {
  const [scanMode, setScanMode] = useAtom(scanModeAtom);
  const defaultStyle =
    "absolute -top-16 left-1/2 -translate-x-1/2 backdrop-blur-2xl";
    
  const handleClick = (startScan: boolean) => {
    setScanMode(startScan);
  };

  if (scanMode) {
    return (
      <Button
        className={cn(defaultStyle, "bg-green-600/50 border border-green-600")}
        onClick={() => handleClick(false)}
      >
        <CheckIcon />
        Finir le scan
      </Button>
    );
  }

  return (
    <Button
      className={cn(defaultStyle, "bg-primary/50 border border-muted-foreground")}
      onClick={() => handleClick(true)}
    >
      <ScanIcon />
      Scanner la pièce
    </Button>
  );
}
