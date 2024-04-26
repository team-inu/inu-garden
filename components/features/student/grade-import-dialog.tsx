'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { ImportIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

import { Button } from '@/components/ui/button';
import { CarouselApi } from '@/components/ui/carousel';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStrictForm } from '@/hooks/form-hook';
import { useCreateGrade } from '@/hooks/grade-hook';
import { tableToObject, worksheetToTables } from '@/libs/excel';
import {
  PayloadCreateGradeSchema,
  PayloadCreateGradeType,
  PayloadCreateGradeTypeDefaultValues,
} from '@/types/schema/grade-schema';

const GradeImportDialog: React.FC = () => {
  const form = useStrictForm(
    PayloadCreateGradeSchema,
    PayloadCreateGradeTypeDefaultValues,
  );
  const fileImportRef = useRef<HTMLInputElement>(null);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'studentGrade',
  });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { mutate, isSuccess } = useCreateGrade();

  const onSubmit = (value: PayloadCreateGradeType) => {
    mutate(value);
  };

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
  const handleUploadUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return toast.error('Can not read file');
    }

    const buffer = await file.arrayBuffer();
    const workBook = XLSX.read(buffer, { type: 'buffer' });

    const gradeSheet = workBook.Sheets[workBook.SheetNames[0]];

    const [gradeTable, semesterTable] = await worksheetToTables(gradeSheet);

    const grades = tableToObject(gradeTable[0], gradeTable.slice(1));
    const [semester] = tableToObject(semesterTable[0], semesterTable.slice(1));

    form.reset({
      year: parseInt(semester['_year']),
      semesterSequence: String(semester['semesterSequence']),
      studentGrade: grades.map((e) => {
        return {
          grade: Number(e['grade']),
          studentId: String(e['_studentId']),
        };
      }),
    });

    toast.success('Users imported successfully');
  };
  return (
    <DialogContent
      className=""
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
    >
      <DialogHeader>
        <DialogTitle>Import Grade</DialogTitle>
        <DialogDescription>
          Import grade from a file. The file should be in .xlsx format.
        </DialogDescription>
      </DialogHeader>
      <Input
        type="file"
        className="hidden"
        ref={fileImportRef}
        onChange={handleUploadUser}
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
          User {current} of {count}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4 font-mono">
            <div>{`year: ${form.getValues('year')} sequence: ${form.getValues('semesterSequence')}`}</div>
            <div>{``}</div>

            <div>-----------------</div>
            <div>studentId | grade</div>
            <div>-----------------</div>
            {form
              .getValues(`studentGrade`)
              ?.map((e, i) => (
                <div key={i}>{`${e.studentId}  ${e.grade}`}</div>
              ))}
          </ScrollArea>
        </form>
      </Form>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            onClick={() => {
              form.reset(PayloadCreateGradeTypeDefaultValues);
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
  );
};

export default GradeImportDialog;
