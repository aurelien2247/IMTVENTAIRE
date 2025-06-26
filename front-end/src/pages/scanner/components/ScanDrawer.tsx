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
  onClose?: () => void;
}

const snapPoints = [0.4, 0.6, 0.9];

export function ScanDrawer({ children, onClose }: ScanDrawerProps) {
  const [codeScanned] = useAtom(codeScannedAtom);
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isOpen = codeScanned !== null;

  if (!codeScanned) {
    return null;
  }

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
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
      onOpenChange={(open) => !open && onClose?.()}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <DrawerContent className="h-screen *:overflow-y-auto *:pt-4">{children}</DrawerContent>
    </Drawer>
  );
}
