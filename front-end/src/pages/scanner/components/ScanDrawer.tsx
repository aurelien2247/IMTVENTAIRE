import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface ScanDrawerProps {
  articleScanned: string | null;
  setArticleScanned: (articleScanned: string | null) => void;
  children: React.ReactNode;
}

export function ScanDrawer({
  articleScanned,
  setArticleScanned,
  children,
}: ScanDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isOpen = articleScanned !== null;

  const closeDrawer = () => {
    setArticleScanned(null);
  };

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={closeDrawer}>
        <DialogContent className="sm:max-w-[425px]">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={closeDrawer}>
      <DrawerContent>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
