import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ScanConfirmDialogProps {
  open: boolean;
  onConfirm: (confirm: boolean) => void;
  onQuit: () => void;
}

export default function ScanConfirmDialog({
  open,
  onConfirm,
  onQuit,
}: ScanConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onConfirm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sauvegarde de l'inventaire</DialogTitle>
          <DialogDescription>
            Vous vous apprêtez à quitter le scan de l'inventaire.
            <br />
            Voulez-vous enregistrer les articles sauvegardés ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={onQuit}>
            Quitter
          </Button>
          <Button onClick={() => onConfirm(true)}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
