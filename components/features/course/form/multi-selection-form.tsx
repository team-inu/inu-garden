"use client";

import { CheckIcon, PlusCircleIcon } from "lucide-react";
import React from "react";

import { cn } from "@/libs/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";

type MultiSelectionFormProps = {
  name: string;
  lable: string;
  placeholder: string;
  options: {
    value: string;
    text: string;
  }[];
  form: UseFormReturn<any>;
};

const MultiSelectionForm: React.FC<MultiSelectionFormProps> = ({
  form,
  name,
  lable,
  options,
}) => {
  const selectedValues = new Set<string>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{lable}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="outline" className="w-full justify-start">
                  <PlusCircleIcon className="mr-2 h-4 w-4" />
                  {selectedValues?.size > 0 && (
                    <>
                      <Separator orientation="vertical" className="mx-2 h-4" />
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal lg:hidden"
                      >
                        {selectedValues.size}
                      </Badge>
                      <div className="flex space-x-1">
                        {selectedValues.size > 6 ? (
                          <Badge
                            variant="secondary"
                            className="rounded-sm px-1 font-normal"
                          >
                            {selectedValues.size} selected
                          </Badge>
                        ) : (
                          options
                            .filter((option) =>
                              selectedValues.has(option.value)
                            )
                            .map((option) => (
                              <Badge
                                variant="secondary"
                                key={option.value}
                                className="rounded-sm px-1 font-normal"
                              >
                                {option.text}
                              </Badge>
                            ))
                        )}
                      </div>
                    </>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search array..." className="h-9" />
                <CommandEmpty>No result found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option, index) => {
                    const isSelected = selectedValues.has(option.value);
                    return (
                      <CommandItem
                        key={index}
                        onSelect={() => {
                          if (isSelected) {
                            selectedValues.delete(option.value);
                          } else {
                            selectedValues.add(option.value);
                          }
                          const filterValues = Array.from(selectedValues);
                          form.setValue(name, filterValues);
                        }}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className={cn("h-4 w-4")} />
                        </div>
                        <span>{option.text}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MultiSelectionForm;
