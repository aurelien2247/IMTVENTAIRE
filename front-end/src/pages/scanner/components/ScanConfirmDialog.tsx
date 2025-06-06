import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface ScanConfirmDialogProps {
  open: boolean;
  onConfirm: (confirm: boolean) => void;
}

export default function ScanConfirmDialog({ open, onConfirm }: ScanConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sauvegarde de l'inventaire</AlertDialogTitle>
          <AlertDialogDescription>
            Vous vous apprêtez à quitter le scan de l'inventaire.
            <br />
            Voulez-vous enregistrer les articles sauvegardés ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="secondary" onClick={() => onConfirm(false)}>Annuler</Button>
          <Button onClick={() => onConfirm(true)}>Enregistrer</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
