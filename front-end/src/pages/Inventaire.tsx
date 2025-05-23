import BatimentList from "@/components/custom/BatimentList";
import { SearchBar } from "@/components/custom/SearchBar";

const Inventaire = () => {
  return (
    <main className="px-8 py-12 flex flex-col gap-4">
      <h1>Inventaire</h1>
      <SearchBar label="Rechercher" />
      <BatimentList />
    </main>
  );
};

export default Inventaire;
