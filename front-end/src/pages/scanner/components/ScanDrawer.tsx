import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useState } from "react";
import { useAtom } from "jotai";
import { codeScannedAtom } from "@/lib/atoms";

interface ScanDrawerProps {
  children: React.ReactNode;
}

const snapPoints = [0.4, 0.6, 0.9];

export function ScanDrawer({ children }: ScanDrawerProps) {
  const [codeScanned, setCodeScanned] = useAtom(codeScannedAtom);
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isOpen = codeScanned !== null;

  const closeDrawer = () => {
    setCodeScanned(null);
  };

  if (!codeScanned) {
    return null;
  }

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={closeDrawer}>
        <DialogContent className="sm:max-w-[425px] *:p-4 max-h-[80vh] overflow-y-auto">
          <DialogTitle className="sr-only">Informations</DialogTitle>
          <DialogDescription className="sr-only">
            {codeScanned}
          </DialogDescription>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={closeDrawer}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <DrawerContent className="h-screen *:pt-4 overflow-y-auto">{children}</DrawerContent>
    </Drawer>
  );
}
