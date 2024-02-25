import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { subPloService } from '@/services/sub-plo-service';
import { CreateSubPloType } from '@/types/schema/sub-plo-schema';

export const useGetSubPloList = () =>
  useQuery({
    queryKey: ['splos'],
    queryFn: () => subPloService.getSubPloList(),
  });

export const useCreateSubPlo = () => {
  return useMutation({
    mutationFn: (splo: CreateSubPloType) => subPloService.createSubPlo(splo),
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
