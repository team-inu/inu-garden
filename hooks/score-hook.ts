import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { scoreService } from '@/services/score-service';
import { CreateScoreType } from '@/types/schema/score-schema';

export const useCreateScore = () => {
  return useMutation({
    mutationFn: ({
      score,
      assignmentId,
    }: {
      score: CreateScoreType;
      assignmentId: string;
    }) => scoreService.createScore(score, assignmentId),
    onSuccess: () => {
      toast.success('Score has been created', {
        description: 'You can now add questions to the student.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create score', {
        description: error.message,
      });
    },
  });
};
