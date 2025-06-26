import { useDesktop } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
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
import { useAddCategorie, useCategories, useEtats } from "@/hooks/useArticle";
import type { Categorie, Etat } from "@/types";

export type Status = Categorie | Etat;

type ComboboxType = "categorie" | "etat";

interface ComboboxProps {
  type: ComboboxType;
  status?: Status;
  noOptionText?: string;
  onSelectedStatusChange?: (status: Status | null) => void;
  disabled?: boolean;
  allowCreate?: boolean;
}

export function Combobox({ 
  type, 
  status, 
  noOptionText = "Aucune option", 
  onSelectedStatusChange, 
  disabled,
  allowCreate = false 
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useDesktop();
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(status || null);

  useEffect(() => {
    setSelectedStatus(status || null);
  }, [status]);

  const { data: categories = [] } = useCategories();
  const { data: etats = [] } = useEtats();
  
  const options = type === "categorie" ? categories : etats;

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={!disabled ? setOpen : undefined}>
        <PopoverTrigger>
          <Button variant="outline" className="justify-between w-full" type="button" disabled={disabled}>
            {selectedStatus ? (
              <>{selectedStatus.nom}</>
            ) : (
              <>{noOptionText}</>
            )}
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList 
            type={type}
            setOpen={setOpen} 
            setSelectedStatus={setSelectedStatus} 
            options={options} 
            noOptionText={noOptionText}
            onSelectedStatusChange={onSelectedStatusChange}
            allowCreate={allowCreate}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={!disabled ? setOpen : undefined}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="justify-between" disabled={disabled}>
          {selectedStatus ? <>{selectedStatus.nom}</> : <>{noOptionText}</>}
          <ChevronsUpDown />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList 
            type={type}
            setOpen={setOpen} 
            setSelectedStatus={setSelectedStatus} 
            options={options} 
            noOptionText={noOptionText}
            onSelectedStatusChange={onSelectedStatusChange}
            allowCreate={allowCreate}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface StatusListProps {
  type: ComboboxType;
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
  options: Status[];
  noOptionText: string;
  onSelectedStatusChange?: (status: Status | null) => void;
  allowCreate?: boolean;
}

function StatusList({
  type,
  setOpen,
  setSelectedStatus,
  options,
  onSelectedStatusChange,
  allowCreate = false,
}: StatusListProps) {
  const [input, setInput] = useState("");
  const createMutation = useAddCategorie();

  const handleSelect = (status: Status) => {
    setSelectedStatus(status);
    onSelectedStatusChange?.(status);
    setOpen(false);
  };

  const inputAlreadyExists = options.some(
    (status) => status.nom.toLowerCase() === input.toLowerCase()
  );

  const handleCreate = async () => {
    if (input.trim() === "" || type !== "categorie") return;
    createMutation.mutate(input, {
      onSuccess: (categorie) => {
        handleSelect(categorie);
      }
    });
  };

  return (
    <Command>
      {allowCreate && type === "categorie" && (
        <CommandInput placeholder="Rechercher" onValueChange={setInput} value={input}/>
      )}
      <CommandList>
        <CommandGroup>
          {options.map((status) => (
            <CommandItem
              key={status.id}
              value={`${status.nom} ${status.id}`}
              onSelect={() => handleSelect(status)}
            >
              {status.nom}
            </CommandItem>
          ))}

          {allowCreate && type === "categorie" && input.trim() !== "" && !inputAlreadyExists && (
            <CommandItem
              value={input}
              onSelect={handleCreate}
              className="italic text-muted-foreground cursor-pointer"
            >
              {createMutation.isPending ? "Création..." : `Créer « ${input} »`}
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
