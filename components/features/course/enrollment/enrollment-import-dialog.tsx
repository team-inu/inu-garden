'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { ImportIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

import { Button } from '@/components/ui/button';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStrictForm } from '@/hooks/form-hook';
import { tableToObject, worksheetToTables } from '@/libs/excel';
import {
  CreateEnrollmentPayload,
  CreateEnrollmentPayloadDefaultValues,
  CreateEnrollmentPayloadSchema,
} from '@/types/schema/enrollment-schema';

type EnrollmentImportDialogProps = {
  onSubmit: (values: CreateEnrollmentPayload) => void;
  open: boolean;
  setIsOnOpenChange: (open: boolean) => void;
};

const EnrollmentImportDialog: React.FC<EnrollmentImportDialogProps> = ({
  onSubmit,
  open,
  setIsOnOpenChange: isOnOpenChange,
}) => {
  const form = useStrictForm(
    CreateEnrollmentPayloadSchema,
    CreateEnrollmentPayloadDefaultValues,
  );
  const fileImportRef = useRef<HTMLInputElement>(null);
  const { id: courseId } = useParams<{ id: string }>();

  const handleUploadClo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return toast.error('Can not read file');
    }

    const buffer = await file.arrayBuffer();
    const workBook = XLSX.read(buffer, { type: 'buffer' });

    const enrollmentSheet = workBook.Sheets[workBook.SheetNames[0]];

    const [enrollmentTable] = await worksheetToTables(enrollmentSheet);

    const enrollments = tableToObject(
      enrollmentTable[0],
      enrollmentTable.slice(1),
    );

    console.log(enrollments.map((e) => String(e._studentId)));
    form.reset({
      courseId: courseId,
      status: 'ENROLL',
      studentIds: enrollments.map((e) => String(e._studentId)),
    });

    toast.success(
      'Enrollments excel parsed successfully, please review the data before submit',
    );
  };

  return (
    <Dialog open={open} onOpenChange={isOnOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Import Enrollment</DialogTitle>
          <DialogDescription>
            Import enrollment from a file. The file should be in .csv format.
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

        <ScrollArea className="h-[200px] w-full rounded-md border p-4 font-mono">
          {form.getValues('studentIds').map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </ScrollArea>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}></form>
        </Form>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              form.reset(CreateEnrollmentPayloadDefaultValues);
            }}
          >
            Clear data
          </Button>
          <DialogClose asChild>
            <Button
              onClick={() => {
                form.reset(CreateEnrollmentPayloadDefaultValues);
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

export default EnrollmentImportDialog;
