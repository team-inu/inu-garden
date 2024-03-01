'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { Row } from '@tanstack/react-table';
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
import { useUnLinkSubPlo } from '@/hooks/clo-hook';
import { SubPLOSchema } from '@/types/schema/sub-plo-schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function SubPloUnlinkClo<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const subPlo = SubPLOSchema.parse(row.original);
  const [open, setOpen] = useState(false);

  const cloId = useSearchParams().get('cloId');
  const { mutate, isSuccess } = useUnLinkSubPlo();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  const onDelete = () => {
    if (cloId) {
      mutate({ cloId, subPloId: subPlo.id });
    } else {
      toast.error('CLO id is not found');
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
