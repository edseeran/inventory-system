import React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Choice {
    value: string;
    label: string;
}

interface ComboBoxProps {
    choices: Choice[];
    value: string;
    onChange: (value: string) => void;
}

const ComboBox = ({ choices, value, onChange }: ComboBoxProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? choices.find((choice) => choice.value === value)
                              ?.label
                        : "Select..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px]">
                <Command>
                    <CommandInput placeholder="Search..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No options</CommandEmpty>
                        <CommandGroup>
                            {choices.map((choice) => (
                                <CommandItem
                                    key={choice.value}
                                    value={choice.value}
                                    onSelect={() => onChange(choice.value)}
                                >
                                    {choice.label}
                                    {value === choice.value && (
                                        <CheckIcon
                                            className={cn("ml-auto h-4 w-4")}
                                        />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export { ComboBox };
