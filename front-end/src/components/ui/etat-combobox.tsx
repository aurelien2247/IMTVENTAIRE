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
import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { API_BASE_URL } from "@/api/api";

export type Status = {
  value: string;
  label: string;
};

interface EtatComboboxProps {
  initialStatus?: Status;
  noOptionText?: string;
  onSelectedStatusChange?: (status: Status | null) => void;
}

export function EtatCombobox({ initialStatus, noOptionText = "Aucune option", onSelectedStatusChange }: EtatComboboxProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(initialStatus || null);
  const [options, setOptions] = useState<Status[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/etats`);
        const data = await response.json();
        const formatted = data.map((etat: Etat) => ({
          label: etat.nom,
          value: etat.id.toString(),
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

  const handleSelect = (status: Status) => {
    setSelectedStatus(status);
    onSelectedStatusChange?.(status);
    setOpen(false);
  };

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
          <Command>
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
              </CommandGroup>
            </CommandList>
          </Command>
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
          <Command>
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
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </DrawerContent>
    </Drawer>
  );
} 