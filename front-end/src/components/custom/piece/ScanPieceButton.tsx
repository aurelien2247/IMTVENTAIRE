import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, ScanIcon } from "lucide-react";

interface ScanPieceButtonProps {
  isScanning: boolean;
  setIsScanning: (isScanning: boolean) => void;
}

export default function ScanPieceButton({
  isScanning,
  setIsScanning,
}: ScanPieceButtonProps) {
  const defaultStyle =
    "absolute -top-24 left-1/2 -translate-x-1/2 backdrop-blur-2xl";
  const handleClick = (startScan: boolean) => {
    setIsScanning(startScan);
  };

  if (isScanning) {
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
