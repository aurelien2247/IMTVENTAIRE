import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import type { Etat } from "@/types";
import {
  Command,
  CommandGroup,
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
import { useEtats } from "@/hooks/useArticle";

interface EtatComboboxProps {
  initialStatus?: Etat;
  noOptionText?: string;
  onSelectedStatusChange?: (status: Etat | null) => void;
  disabled?: boolean;
}

export function EtatCombobox({ initialStatus, noOptionText = "Aucune option", onSelectedStatusChange, disabled }: EtatComboboxProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = useState<Etat | null>(initialStatus || null);

  const { data: options = [] } = useEtats();

  const handleSelect = (status: Etat) => {
    setSelectedStatus(status);
    onSelectedStatusChange?.(status);
    setOpen(false);
  };

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
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((etat: Etat) => (
                  <CommandItem
                    key={etat.id}
                    value={etat.id.toString()}
                    onSelect={() => handleSelect(etat)}
                  >
                    {etat.nom}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
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
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((etat: Etat) => (
                  <CommandItem
                    key={etat.id}
                    value={etat.id.toString()}
                    onSelect={() => handleSelect(etat)}
                  >
                    {etat.nom}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </DrawerContent>
    </Drawer>
  );
} 