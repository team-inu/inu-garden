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
import { PassowrdInput } from '@/components/ui/password-input';
import { useStrictForm } from '@/hooks/form-hook';
import { tableToObject, worksheetToTables } from '@/libs/excel';
import {
  CreateManyLecturerForm,
  CreateManyLecturerFormDefaultValues,
  CreateManyLecturerFormSchema,
} from '@/types/schema/user-schema';

type LecturerImportDialogProps = {
  onSubmit: (values: CreateManyLecturerForm) => void;
  open: boolean;
  isOnOpenChange: (open: boolean) => void;
};

const LecturerImportDialog: React.FC<LecturerImportDialogProps> = ({
  onSubmit,
  open,
  isOnOpenChange,
}) => {
  const form = useStrictForm(
    CreateManyLecturerFormSchema,
    CreateManyLecturerFormDefaultValues,
  );
  const fileImportRef = useRef<HTMLInputElement>(null);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lecturers',
  });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
  const handleUploadClo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return toast.error('Can not read file');
    }

    const buffer = await file.arrayBuffer();
    const workBook = XLSX.read(buffer, { type: 'buffer' });

    const lecturerSheet = workBook.Sheets[workBook.SheetNames[0]];

    const [lecturerTable] = await worksheetToTables(lecturerSheet);

    const lecturers = tableToObject(lecturerTable[0], lecturerTable.slice(1));

    form.reset({
      lecturers: lecturers.map((lecturer) => ({
        firstName: lecturer._firstname,
        lastName: lecturer.lastname,
        email: lecturer.email,
        role: lecturer.role,
        password: lecturer.password,
      })),
    });

    toast.success('Lecturers imported successfully');
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
          <DialogTitle>Import Lecturer</DialogTitle>
          <DialogDescription>
            Import lecturer from a file. The file should be in .csv format.
          </DialogDescription>
        </DialogHeader>
        <Input
          type="file"
          className="hidden"
          ref={fileImportRef}
          onChange={handleUploadClo}
        />
        <Button
          className="w-full"
          variant="outline"
          onClick={() => fileImportRef.current?.click()}
        >
          <ImportIcon className="mr-2 h-4 w-4" />
          Import
        </Button>
        {count > 0 && (
          <div className="py-2 text-center text-sm text-muted-foreground">
            Lecturer {current} of {count}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Carousel setApi={setApi}>
              <CarouselContent>
                {fields.map((item, index) => {
                  return (
                    <CarouselItem key={index}>
                      <FormField
                        control={form.control}
                        name={`lecturers.${index}.firstName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-3">
                                <Input {...field} />
                                <FormMessage />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`lecturers.${index}.lastName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-3">
                                <Input {...field} />
                                <FormMessage />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`lecturers.${index}.role`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-3">
                                <Input {...field} />
                                <FormMessage />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`lecturers.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-3">
                                <Input {...field} />
                                <FormMessage />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`lecturers.${index}.password`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-3">
                                <PassowrdInput {...field} />
                                <FormMessage />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
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
                form.reset(CreateManyLecturerFormDefaultValues);
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

export default LecturerImportDialog;
