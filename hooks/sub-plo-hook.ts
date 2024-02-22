import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { subPloService } from '@/services/sub-plo-service';
import { CreateSubPloType, ImportedSubPloType } from '@/types/schema/sub-plo-schema';

export const useGetSubPloList = () =>
  useQuery({
    queryKey: ['splos'],
    queryFn: () => subPloService.getSubPloList(),
  });

export const useCreateSubPlo = () => {
  return useMutation({
    mutationFn: (splo: CreateSubPloType) =>
    subPloService.createSubPlo(splo),
    onSuccess: () => {
      toast.success('Sub PLO has been created', {
        description: 'You can now add questions to the Sub PLO.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create Sub PLO', {
        description: error.message,
      });
    },
  });
};

export const useCreateSubPloBulk = () => {
  return useMutation({
    mutationFn: (splos: ImportedSubPloType[]) =>
    subPloService.createSubPloBulk(splos),
    onSuccess: () => {
      toast.success('Sub PLOs have been created', {
        description: 'You can now see the Sub PLOs in the list.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create Sub PLOs', {
        description: error.message,
      });
    },
  });
};
