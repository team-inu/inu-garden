'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { Column, Row } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// TODO: make it dynamic
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUnLinkClo } from '@/hooks/assignment-hook';
import { CloSchema } from '@/types/schema/clo-shema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  column: Column<TData>;
}

export function CloUnlinkAssignment<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const clo = CloSchema.parse(row.original);
  const [open, setOpen] = useState(false);

  const assignmentId = useSearchParams().get('assignmentId');
  const { mutate, isSuccess } = useUnLinkClo();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  const onDelete = () => {
    if (assignmentId) {
      mutate({ cloId: clo.id, assignmentId: assignmentId });
    } else {
      toast.error('assessment id is not found');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Trash2 className="cursor-pointer hover:text-destructive" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are your sure to delete?</DialogTitle>
            <DialogDescription>
              {` You can't undo this action. This will permanently delete the.`}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={onDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
