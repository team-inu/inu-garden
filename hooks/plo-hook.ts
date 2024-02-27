import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ploService } from '@/services/plo-service';
import { CreateManyPloType, CreatePloType } from '@/types/schema/plo-schema';
import { CreateManySubPloType } from '@/types/schema/sub-plo-schema';

export const useGetPloList = () =>
  useQuery({
    queryKey: ['plos'],
    queryFn: () => ploService.getPloList(),
  });

export const useCreatePlo = () => {
  return useMutation({
    mutationFn: (plo: CreatePloType) => ploService.createPlo(plo),
    onSuccess: () => {
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
  return useMutation({
    mutationFn: (outcomes: {
      plos: CreateManyPloType;
      splos: CreateManySubPloType;
    }) => ploService.createManyPlos(outcomes.plos, outcomes.splos),
    onSuccess: () => {
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
