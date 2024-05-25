import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { scoreService } from '@/services/score-service';
import { CreateBulkScoresForm, CreateScoreForm, UpdateScoreForm } from '@/types/schema/score-schema';

export const useCreateScore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ score, assignmentId }: { score: CreateScoreForm; assignmentId: string }) =>
      scoreService.createScore(score, assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores'] });
      toast.success('Score has been created', {
        description: 'You can now see the score from the table.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create score', {
        description: error.message,
      });
    },
  });
};

export const useCreateBulkScore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ scores, assignmentId }: { scores: CreateBulkScoresForm; assignmentId: string }) =>
      scoreService.createBulkScores(scores, assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores'] });
      toast.success('Score has been created', {
        description: 'You can now see the score from the table.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create score', {
        description: error.message,
      });
    },
  });
};

export const useGetScoresByAssignmentId = (assignmentId: string) =>
  useQuery({
    queryKey: ['scores', assignmentId],
    queryFn: () => scoreService.getScoresByAssignmentId(assignmentId),
  });

export const useUpdateScore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ score, id }: { score: UpdateScoreForm; id: string }) => scoreService.updateScore(score, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores'] });
      toast.success('Score has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update Score', {
        description: error.message,
      });
    },
  });
};

export const useDeleteScore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => scoreService.deleteScore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores'] });
      toast.success('Score has been deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete score', {
        description: error.message,
      });
    },
  });
};
