'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { ImportIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
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
import { useCreateBulkScore } from '@/hooks/score-hook';
import { tableToObject, worksheetToTables } from '@/libs/excel';
import {
  CreateBulkScoresForm,
  CreateBulkScoresFormDefaultValues,
  CreateBulkScoresFormSchema,
} from '@/types/schema/score-schema';

type ScoreImportDialogProps = {
  open: boolean;
  setIsOnOpenChange: (open: boolean) => void;
};

const ScoreImportDialog: React.FC<ScoreImportDialogProps> = ({ open, setIsOnOpenChange: isOnOpenChange }) => {
  const form = useStrictForm(CreateBulkScoresFormSchema, CreateBulkScoresFormDefaultValues);
  const fileImportRef = useRef<HTMLInputElement>(null);

  const { mutate: createScores } = useCreateBulkScore();

  const assignmentId = useSearchParams().get('assignmentId');

  const handleUploadScore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return toast.error('Can not read file');
    }

    const buffer = await file.arrayBuffer();
    const workBook = XLSX.read(buffer, { type: 'buffer' });

    const sheet = workBook.Sheets[workBook.SheetNames[0]];

    const [scoreTable] = await worksheetToTables(sheet);
    const scores = tableToObject(scoreTable[0], scoreTable.slice(1));

    const payload = scores
      .filter((e) => !isNaN(e.score))
      .map((e) => {
        return {
          studentId: e._studentId,
          score: e.score,
        };
      });

    form.reset({
      studentScores: payload,
    });

    toast.success('scores excel parsed successfully, please review the data before submit');
  };

  const onSubmit = (data: CreateBulkScoresForm) => {
    if (!assignmentId) {
      return toast.error('assessment id not found');
    }
    createScores({ scores: data, assignmentId: assignmentId });
  };

  return (
    <Dialog open={open} onOpenChange={isOnOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Import Score</DialogTitle>
          <DialogDescription>Import score from a file. The file should be in .xlsx format.</DialogDescription>
        </DialogHeader>
        <Input type="file" className="hidden" ref={fileImportRef} onChange={handleUploadScore} />
        <Button className="w-full" variant="outline" onClick={() => fileImportRef.current?.click()}>
          <ImportIcon className="mr-2 h-4 w-4" />
          Import
        </Button>

        <ScrollArea className="h-[200px] w-full rounded-md border p-4 font-mono">
          {form.getValues('studentScores').map((e, i) => (
            <div key={i}>
              {e.studentId}: {e.score}
            </div>
          ))}
        </ScrollArea>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}></form>
        </Form>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              form.reset();
            }}
          >
            Clear data
          </Button>
          <DialogClose asChild>
            <Button
              onClick={() => {
                form.reset(CreateBulkScoresFormDefaultValues);
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

export default ScoreImportDialog;
