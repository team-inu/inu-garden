import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ploService } from '@/services/plo-service';
import {
  CreateManyPloForm,
  CreatePloForm,
  UpdatePloForm,
} from '@/types/schema/plo-schema';
import { CreateManySubPloType } from '@/types/schema/sub-plo-schema';

export const useGetPloList = () =>
  useQuery({
    queryKey: ['plos'],
    queryFn: () => ploService.getPloList(),
  });

export const useCreatePlo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (plo: CreatePloForm) => ploService.createPlo(plo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plos'] });
      toast.success('PLO has been created', {
        description: 'You can now add questions to the PLO.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create PLO', {
        description: error.message,
      });
    },
  });
};

export const useCreateManyPlos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (outcomes: {
      plos: CreateManyPloForm;
      splos: CreateManySubPloType;
    }) => ploService.createManyPlos(outcomes.plos, outcomes.splos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plos'] });
      toast.success('PLOs have been created', {
        description: 'You can now see the PLOs in the list.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create PLOs', {
        description: error.message,
      });
    },
  });
};

export const useUpdatePlo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ plo, id }: { plo: UpdatePloForm; id: string }) =>
      ploService.updatePlo(plo, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plos'] });
      toast.success('PLO has been updated', {
        description: 'You can now add questions to the PLO.',
      });
    },
    onError: (error) => {
      toast.error('Failed to update PLO', {
        description: error.message,
      });
    },
  });
};

export const useDeletePlo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ploService.deletePlo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plos'] });
      toast.success('PLO has been deleted', {
        description: 'You can now add questions to the PLO.',
      });
    },
    onError: (error) => {
      toast.error('Failed to delete PLO', {
        description: error.message,
      });
    },
  });
};
