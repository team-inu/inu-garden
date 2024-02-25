import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { poService } from '@/services/po-service';
import { CreatePoType, ImportedPoType } from '@/types/schema/po-schema';

export const useGetPoList = () =>
  useQuery({
    queryKey: ['pos'],
    queryFn: () => poService.getPoList(),
  });

export const useCreatePo = () => {
  return useMutation({
    mutationFn: (po: CreatePoType) => poService.createPo(po),
    onSuccess: () => {
      toast.success('PO has been created', {
        description: 'You can now add questions to the PO.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create PO', {
        description: error.message,
      });
    },
  });
};

export const useCreatePoBulk = () => {
  return useMutation({
    mutationFn: (pos: ImportedPoType[]) => poService.createPoBulk(pos),
    onSuccess: () => {
      toast.success('POs have been created', {
        description: 'You can now see the POs in the list.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create POs', {
        description: error.message,
      });
    },
  });
};
