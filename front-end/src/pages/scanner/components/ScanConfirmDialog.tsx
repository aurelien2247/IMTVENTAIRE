import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';

interface ScanConfirmDialogProps {
  open: boolean;
  onConfirm: (confirm: boolean) => void;
}

export default function ScanConfirmDialog({ open, onConfirm }: ScanConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onConfirm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription>
            Voulez-vous enregistrer les articles sauvegardés ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onConfirm(false)}>Annuler</Button>
          <Button onClick={() => onConfirm(true)}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
