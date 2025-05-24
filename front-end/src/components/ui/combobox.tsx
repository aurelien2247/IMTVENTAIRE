import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
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

type Status = {
  value: string;
  label: string;
};

interface ComboboxProps {
  options: Status[];
  noOptionText?: string;
};

export function Combobox({ options, noOptionText = "Aucune option" }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

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
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} options={options} noOptionText={noOptionText} />
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
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} options={options} noOptionText={noOptionText} />
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
}

function StatusList({
  setOpen,
  setSelectedStatus,
  options,
  noOptionText,
}: StatusListProps) {
  return (
    <Command>
      <CommandInput placeholder="Rechercher" />
      <CommandList>
        <CommandEmpty>{noOptionText} ne correspond à votre recherche</CommandEmpty>
        <CommandGroup>
          {options.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  options.find((priority) => priority.value === value) || null
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
