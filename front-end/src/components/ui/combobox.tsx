import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import type { Categorie } from "@/types";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { createCategory, fetchCategories } from "@/api/article";

type Status = {
  value: string;
  label: string;
};

interface ComboboxProps {
  options: Status[];
  noOptionText?: string;
};

export function Combobox({ noOptionText = "Aucune option" }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [options, setOptions] = useState<Status[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await fetchCategories();
        const formatted = data.map((cat: Categorie) => ({
          label: cat.nom,
          value: cat.id.toString(),
        }));

      setOptions(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, []);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button variant="outline" className="justify-between w-full" type="button">
            {selectedStatus ? (
              <>{selectedStatus.label}</>
            ) : (
              <>{noOptionText}</>
            )}
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} options={options} setOptions={setOptions} noOptionText={noOptionText} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="justify-between">
          {selectedStatus ? <>{selectedStatus.label}</> : <>{noOptionText}</>}
          <ChevronsUpDown />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} options={options} setOptions={setOptions} noOptionText={noOptionText} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface StatusListProps {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
  options: Status[];
  setOptions: (options: Status[]) => void;
  noOptionText: string;
}

function StatusList({
  setOpen,
  setSelectedStatus,
  setOptions,
  options,
}: StatusListProps) {

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelect = (status: Status) => {
    setSelectedStatus(status);
    setOpen(false);
  };

  const inputAlreadyExists = options.some(
    (status) => status.label.toLowerCase() === input.toLowerCase()
  );

  const handleCreate = async () => {
    if (input.trim() === "") return;
    setLoading(true);
    try {
      const categorie = await createCategory(input);
      const newCategorie: Status = {
        label: categorie.nom,
        value: String(categorie.id),
      };
      setOptions([...options, newCategorie]);
      handleSelect(newCategorie);
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      alert("Échec de la création du statut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Command>
      <CommandInput placeholder="Rechercher" onValueChange={setInput} value={input}/>
      <CommandList>
        <CommandGroup>
          {options.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={() => handleSelect(status)}
            >
              {status.label}
            </CommandItem>
          ))}

          {input.trim() !== "" && !inputAlreadyExists && (
            <CommandItem
              value={input}
              onSelect={handleCreate}
              className="italic text-muted-foreground"
            >
              {loading ? "Création..." : `Créer « ${input} »`}
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
