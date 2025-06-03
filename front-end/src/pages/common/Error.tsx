import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <div className="container flex-1 flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 *:text-center">
        <h1>Oups... 🤕</h1>
        <h3>Nous n'avons pas réussi à trouver ce que vous cherchiez</h3>
      </div>
      <Button onClick={() => window.location.reload()}>Réessayer</Button>
    </div>
  )
}
