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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-api';
import { Textarea } from '@/components/ui/textarea';
import { useStrictForm } from '@/hooks/form-hook';
import { tableToObject, worksheetToTables } from '@/libs/excel';
import {
  CreateManyPloDefaultValues,
  CreateManyPloSchema,
  CreateManyPloType,
} from '@/types/schema/plo-schema';
import {
  CreateManyPoDefaultValues,
  CreateManyPoSchema,
  CreateManyPoType,
} from '@/types/schema/po-schema';
import {
  CreateManySubPloDefaultValues,
  CreateManySubPloSchema,
  CreateManySubPloType,
} from '@/types/schema/sub-plo-schema';

type TabeeImportDialogProps = {
  onPloSubmit: (values: CreateManyPloType) => void;
  onSubPloSubmit: (values: CreateManySubPloType) => void;
  onPoSubmit: (values: CreateManyPoType) => void;
  open: boolean;
  isOnOpenChange: (open: boolean) => void;
};

const TabeeImportDialog: React.FC<TabeeImportDialogProps> = ({
  onPloSubmit,
  onSubPloSubmit,
  onPoSubmit,
  open,
  isOnOpenChange,
}) => {
  const ploForm = useStrictForm(
    CreateManyPloSchema,
    CreateManyPloDefaultValues,
  );
  const sploForm = useStrictForm(
    CreateManySubPloSchema,
    CreateManySubPloDefaultValues,
  );
  const poForm = useStrictForm(CreateManyPoSchema, CreateManyPoDefaultValues);
  const fileImportRef = useRef<HTMLInputElement>(null);
  const {
    fields: ploFields,
    append: ploAppend,
    remove: ploRemove,
  } = useFieldArray({
    control: ploForm.control,
    name: 'plo',
  });
  const {
    fields: sploFields,
    append: sploAppend,
    remove: sploRemove,
  } = useFieldArray({
    control: sploForm.control,
    name: 'splo',
  });
  const {
    fields: poFields,
    append: poAppend,
    remove: poRemove,
  } = useFieldArray({
    control: poForm.control,
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

    const ploSheet = workBook.Sheets[workBook.SheetNames[0]];
    const subPloSheet = workBook.Sheets[workBook.SheetNames[1]];
    const poSheet = workBook.Sheets[workBook.SheetNames[2]];

    const [infoTable, ploTable] = await worksheetToTables(ploSheet);
    const [subPloTable] = await worksheetToTables(subPloSheet);
    const [poTable] = await worksheetToTables(poSheet);

    const info = tableToObject(infoTable[0], infoTable.slice(1));
    const plos = tableToObject(ploTable[0], ploTable.slice(1));
    const splos = tableToObject(subPloTable[0], subPloTable.slice(1));
    const pos = tableToObject(poTable[0], poTable.slice(1));

    const outcomes: any = [];

    plos.forEach((plo) => {
      plo = { type: 'plo', ...plo };
      outcomes.push(plo);
      splos.forEach((splo) => {
        if (String(splo._PLO) === String(plo._Code)) {
          splo = { type: 'splo', ...splo };
          outcomes.push(splo);
        }
      });
    });

    pos.forEach((po) => {
      po = { type: 'po', ...po };
      outcomes.push(po);
    });

    console.log(outcomes);

    ploForm.reset({
      plo: plos.map((e) => {
        return {
          code: String(e._Code),
          descriptionThai: e.Description_Thai,
          descriptionEng: e.Description_Eng,
          programYear: info[0].Year,
          programmeName: info[0]._Curriculum,
        };
      }),
    });

    sploForm.reset({
      splo: splos.map((e) => {
        return {
          code: String(e._PLO) + '.' + String(e.Code),
          descriptionThai: e.Description_Thai,
          descriptionEng: e.Description_Eng,
        };
      }),
    });

    poForm.reset({
      po: outcomes
        .filter((e: any) => e.type === 'po')
        .map((e: any) => {
          return {
            code: String(e._Code),
            name: e.Name,
            description: e.Description,
          };
        }),
    });
  };

  const handleSubmit = () => {
    ploForm.handleSubmit(onPloSubmit);
    sploForm.handleSubmit(onSubPloSubmit);
    poForm.handleSubmit(onPoSubmit);
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
          <DialogTitle>Import Outcomes (PLO, Sub-PLO, PO)</DialogTitle>
          <DialogDescription>
            Import outcomes from a file. The file should be in .csv format.
          </DialogDescription>
        </DialogHeader>
        <Input
          type="file"
          className="hidden"
          ref={fileImportRef}
          onChange={handleUpload}
        />
        <Button
          className="w-full"
          variant="outline"
          onClick={() => fileImportRef.current?.click()}
        >
          <ImportIcon className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Tabs defaultValue="overview" className="">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="plo">PLO</TabsTrigger>
              <TabsTrigger value="splo">Sub-PLO</TabsTrigger>
              <TabsTrigger value="po">PO</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="plo" className="space-y-4">
            <Form {...ploForm}>
              <form onSubmit={ploForm.handleSubmit(onPloSubmit)}>
                <Carousel setApi={setApi}>
                  <CarouselContent>
                    {ploFields.map((plo, ploIndex) => {
                      return (
                        <CarouselItem key={ploIndex}>
                          <div className="relative  space-y-2 border p-5 pb-7">
                            <div className="flex justify-between ">
                              <FormField
                                name={`plo[${ploIndex}].code`}
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
                              <FormField
                                name={`plo[${ploIndex}].programYear`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Program Year</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type="number"
                                        min="0"
                                        max="3000"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                name={`plo[${ploIndex}].programmeName`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Link Curriculum</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              name={`plo[${ploIndex}].descriptionThai`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description Thai</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              name={`plo[${ploIndex}].descriptionEng`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description English</FormLabel>
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
          </TabsContent>
          <TabsContent value="splo" className="space-y-4">
            <Form {...sploForm}>
              <form onSubmit={sploForm.handleSubmit(onSubPloSubmit)}>
                <Carousel setApi={setApi}>
                  <CarouselContent>
                    {sploFields.map((sploItem, sploIndex) => {
                      return (
                        <CarouselItem key={sploIndex}>
                          <div className="relative  space-y-2 border p-5 pb-7">
                            <div className="flex justify-between ">
                              <FormField
                                name={`splo[${sploIndex}].code`}
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
                              name={`splo[${sploIndex}].descriptionThai`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description Thai</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              name={`splo[${sploIndex}].descriptionEng`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description English</FormLabel>
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
          </TabsContent>
          <TabsContent value="po" className="space-y-4">
            <Form {...poForm}>
              <form onSubmit={poForm.handleSubmit(onPoSubmit)}>
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
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                ploForm.reset(CreateManyPloDefaultValues);
                setApi(undefined);
                setCurrent(0);
                setCount(0);
              }}
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TabeeImportDialog;
