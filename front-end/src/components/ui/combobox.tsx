import { useMediaQuery } from "@/hooks/use-media-query";
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
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { useAddCategorie, useCategories } from "@/hooks/useArticle";
import type { Categorie } from "@/types";

export type Status = Categorie;

interface ComboboxProps {
  initialStatus?: Status;
  options?: Status[];
  noOptionText?: string;
  onSelectedStatusChange?: (status: Status | null) => void;
  disabled?: boolean;
};

export function Combobox({ initialStatus, noOptionText = "Aucune option", onSelectedStatusChange, disabled }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(initialStatus || null);
  const { data: options = [] } = useCategories();

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
            setOpen={setOpen} 
            setSelectedStatus={setSelectedStatus} 
            options={options} 
            noOptionText={noOptionText}
            onSelectedStatusChange={onSelectedStatusChange}
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
            setOpen={setOpen} 
            setSelectedStatus={setSelectedStatus} 
            options={options} 
            noOptionText={noOptionText}
            onSelectedStatusChange={onSelectedStatusChange}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface StatusListProps {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
  options: Status[];
  noOptionText: string;
  onSelectedStatusChange?: (status: Status | null) => void;
}

function StatusList({
  setOpen,
  setSelectedStatus,
  options,
  onSelectedStatusChange,
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
    if (input.trim() === "") return;
    createMutation.mutate(input, {
      onSuccess: (categorie) => {
        handleSelect(categorie);
      }
    });
  };

  return (
    <Command>
      <CommandInput placeholder="Rechercher" onValueChange={setInput} value={input}/>
      <CommandList>
        <CommandGroup>
          {options.map((status) => (
            <CommandItem
              key={status.id}
              value={status.id.toString()}
              onSelect={() => handleSelect(status)}
            >
              {status.nom}
            </CommandItem>
          ))}

          {input.trim() !== "" && !inputAlreadyExists && (
            <CommandItem
              value={input}
              onSelect={handleCreate}
              className="italic text-muted-foreground"
            >
              {createMutation.isPending ? "Création..." : `Créer « ${input} »`}
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
