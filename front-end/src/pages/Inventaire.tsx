import BatimentList from "@/components/custom/BatimentList";
import { SearchBar } from "@/components/custom/SearchBar";

export default function Inventaire() {
  return (
    <div className="px-8 py-12 flex flex-col gap-4">
      <h1>Inventaire</h1>
      <SearchBar label="Rechercher" />
      <BatimentList />
    </div>
  );
}

