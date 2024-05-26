'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { ImportIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useStrictForm } from '@/hooks/form-hook';
import { tableToObject, worksheetToTables } from '@/libs/excel';
import { CreateManyPloFormDefaultValues, CreateManyPloFormSchema } from '@/types/schema/plo-schema';
import { CreateManyPoForm, CreateManyPoFormDefaultValues, CreateManyPoSchema } from '@/types/schema/po-schema';
import { CreateManySubPloDefaultValues, CreateManySubPloSchema } from '@/types/schema/sub-plo-schema';

type TabeeImportDialogProps = {
  onSubmit: (values: CreateManyPoForm) => void;
  open: boolean;
  isOnOpenChange: (open: boolean) => void;
};

const TabeeImportDialog: React.FC<TabeeImportDialogProps> = ({ onSubmit, open, isOnOpenChange }) => {
  const ploForm = useStrictForm(CreateManyPloFormSchema, CreateManyPloFormDefaultValues);

  const sploForm = useStrictForm(CreateManySubPloSchema, CreateManySubPloDefaultValues);
  const form = useStrictForm(CreateManyPoSchema, CreateManyPoFormDefaultValues);
  const fileImportRef = useRef<HTMLInputElement>(null);
  const {
    fields: poFields,
    append: poAppend,
    remove: poRemove,
  } = useFieldArray({
    control: form.control,
    name: 'po',
  });

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [outcome, setOutcome] = useState('Program Learning Outcome');

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return toast.error('Can not read file');
    }

    const buffer = await file.arrayBuffer();
    const workBook = XLSX.read(buffer, { type: 'buffer' });

    const poSheet = workBook.Sheets[workBook.SheetNames[0]];

    const [poTable] = await worksheetToTables(poSheet);

    const pos = tableToObject(poTable[0], poTable.slice(1));

    form.reset({
      po: pos.map((e: any) => {
        return {
          code: String(e._Code),
          name: e.Name,
          description: e.Description,
        };
      }),
    });
  };

  return (
    <Dialog open={open} onOpenChange={isOnOpenChange}>
      <DialogContent
        className=""
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Import TABEE PO</DialogTitle>
          <DialogDescription>Import program outcomes from a file. The file should be in .csv format.</DialogDescription>
        </DialogHeader>
        <Input type="file" className="hidden" ref={fileImportRef} onChange={handleUpload} />
        <Button className="w-full" variant="outline" onClick={() => fileImportRef.current?.click()}>
          <ImportIcon className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Carousel setApi={setApi}>
              <CarouselContent>
                {poFields.map((po, poIndex) => {
                  return (
                    <CarouselItem key={poIndex}>
                      <div className="relative  space-y-2 border p-5 pb-7">
                        <div className="flex justify-between ">
                          <FormField
                            name={`po[${poIndex}].code`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Code</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          name={`po[${poIndex}].name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name={`po[${poIndex}].description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="h-10 w-10" />
              <CarouselNext className="h-10 w-10" />
            </Carousel>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                form.reset(CreateManyPoFormDefaultValues);
                setApi(undefined);
                setCurrent(0);
                setCount(0);
              }}
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TabeeImportDialog;
