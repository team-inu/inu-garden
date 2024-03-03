import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { poService } from '@/services/po-service';
import {
  CreateManyPoForm,
  CreatePoForm,
  UpdatePoForm,
} from '@/types/schema/po-schema';

export const useGetPoList = () =>
  useQuery({
    queryKey: ['pos'],
    queryFn: () => poService.getPoList(),
  });

export const useCreatePo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (po: CreatePoForm) => poService.createPo(po),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pos'] });
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

export const useCreateManyPos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pos: CreateManyPoForm) => poService.createManyPos(pos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pos'] });
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

export const useUpdatePo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ po, id }: { po: UpdatePoForm; id: string }) =>
      poService.updatePo(po, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pos'] });
      toast.success('PO has been updated', {
        description: 'You can now add questions to the PO.',
      });
    },
    onError: (error) => {
      toast.error('Failed to update PO', {
        description: error.message,
      });
    },
  });
};

export const useDeletePo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => poService.deletePo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pos'] });
      toast.success('PO has been deleted', {
        description: 'You can now add questions to the PO.',
      });
    },
    onError: (error) => {
      toast.error('Failed to delete PO', {
        description: error.message,
      });
    },
  });
};
