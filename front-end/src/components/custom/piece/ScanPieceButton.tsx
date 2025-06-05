import { Button } from "@/components/ui/button";
import { scanModeAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { CheckIcon, ScanIcon } from "lucide-react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function ScanPieceButton() {
  const [scanMode, setScanMode] = useAtom(scanModeAtom);
  const defaultStyle =
    "fixed bottom-16 left-1/2 -translate-x-1/2 backdrop-blur-2xl z-[100] pointer-events-auto";
    
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, startScan: boolean) => {
    event.preventDefault();
    event.stopPropagation();
    setScanMode(startScan);
  };

  const button = scanMode ? (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        className={cn(defaultStyle, "bg-green-600/80 border border-green-600")}
        onClick={(event) => handleClick(event, false)}
        size="lg"
      >
        <motion.div
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CheckIcon />
        </motion.div>
        Finir l'inventaire
      </Button>
    </motion.div>
  ) : (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        className={cn(defaultStyle, "bg-primary/50 border border-muted-foreground")}
        onClick={(event) => handleClick(event, true)}
        size="lg"
      >
        <motion.div
          initial={{ rotate: 180 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ScanIcon />
        </motion.div>
        Faire l'inventaire
      </Button>
    </motion.div>
  );

  return createPortal(button, document.body);
}
