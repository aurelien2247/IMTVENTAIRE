import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ModifierArticle from "@/pages/inventaire/ModifierArticle";

interface ScanDrawerProps {
  articleScanned: string | null;
  setArticleScanned: (articleScanned: string | null) => void;
}

export function ScanDrawer({
  articleScanned,
  setArticleScanned,
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
          <ModifierArticle />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={closeDrawer}>
      <DrawerContent>
        <ModifierArticle />
      </DrawerContent>
    </Drawer>
  );
}
