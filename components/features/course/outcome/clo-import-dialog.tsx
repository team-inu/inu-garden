'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { ImportIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

import CourseFormLink from '@/components/features/course/course-form/form-link';
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
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useStrictForm } from '@/hooks/form-hook';
import { tableToObject, worksheetToTables } from '@/libs/excel';
import {
  CreateManyCloDefaultValues,
  CreateManyCloSchema,
  CreateManyCloType,
} from '@/types/schema/clo-shema';

type CloImportDialogProps = {
  onSubmit: (values: CreateManyCloType) => void;
  open: boolean;
  isOnOpenChange: (open: boolean) => void;
};

const CloImportDialog: React.FC<CloImportDialogProps> = ({
  onSubmit,
  open,
  isOnOpenChange,
}) => {
  const form = useStrictForm(CreateManyCloSchema, CreateManyCloDefaultValues);
  const fileImportRef = useRef<HTMLInputElement>(null);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'clo',
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

    const cloSheet = workBook.Sheets[workBook.SheetNames[0]];

    const [cloTable] = await worksheetToTables(cloSheet);

    const clos = tableToObject(cloTable[0], cloTable.slice(1));

    form.reset({
      clo: clos.map((e) => {
        return {
          code: e._code,
          weight: e.weight,
          description: e.description,
          expectedPassingAssignmentPercentage:
            e.expectedPassingAssignmentPercentage,
          expectedScorePercentage: e.expectedScorePercentage,
          expectedPassingStudentPercentage: e.expectedPassingStudentPercentage,
          courseId: e.courseId,
          subProgramLearningOutcomeId: e.subProgramLearningOutcomeId,
          programLearningOutcomeId: e.programLearningOutcomeId,
        };
      }),
    });

    toast.success('CLOs imported successfully');
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
          <DialogTitle>Import Course Learning Outcome (CLO)</DialogTitle>
          <DialogDescription>
            Import CLOs from a file. The file should be in .csv format.
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
            CLO {current} of {count}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Carousel setApi={setApi}>
              <CarouselContent>
                {fields.map((item, index) => {
                  return (
                    <CarouselItem key={index}>
                      <CourseFormLink
                        index={index}
                        remove={remove}
                        courseFormLinkLength={fields.length}
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
                form.reset(CreateManyCloDefaultValues);
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

export default CloImportDialog;
