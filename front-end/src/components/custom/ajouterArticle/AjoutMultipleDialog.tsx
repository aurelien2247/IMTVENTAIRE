import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface AjoutMultipleDialog {
  open: boolean;
  num_inventaire_from: number;
  num_inventaire_to: number;
  nb_articles: number;
  categorie: string;
  onConfirm: (confirm: boolean) => void;
}

export default function AjoutMultipleDialog({ open, nb_articles,num_inventaire_from,num_inventaire_to, categorie, onConfirm }: AjoutMultipleDialog) {
  return (
    <AlertDialog open={open} onOpenChange={onConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Création multiple</AlertDialogTitle>
          <AlertDialogDescription>
            Vous vous apprêtez à créer <strong>{nb_articles}</strong> articles similaires.
            <br />
            Les identifiants iront de <strong>{num_inventaire_from}</strong> à <strong>{num_inventaire_to}</strong> inclus.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="secondary" onClick={() => onConfirm(false)}>Annuler</Button>
          <Button onClick={() => onConfirm(true)}>Confirmer</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
