import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { coursePortfolioService } from '@/services/course-portfolio-service';
import { SaveCoursePortfolioForm } from '@/types/schema/course-portfolio-schema';

export const useGetCoursePortfolio = (courseId: string) =>
  useQuery({
    queryKey: ['course-portfolio', courseId],
    queryFn: () => coursePortfolioService.getCoursePortfolio(courseId),
  });

export const useGetCloAndPassingCourseLearningOutcome = (courseId: string) =>
  useQuery({
    queryKey: ['clo-and-passing-clo', 'clo', courseId],
    queryFn: () => coursePortfolioService.getCloAndPassingCourseLearningOutcome(courseId),
  });

export const useGetPloAndPoOutcomeEnrollment = (courseId: string) =>
  useQuery({
    queryKey: ['plo-and-po-outcome-enrollment', courseId],
    queryFn: () => coursePortfolioService.getPloandPoOutcomeEnrollment(courseId),
  });

export const useUpdateCoursePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, data }: { courseId: string; data: SaveCoursePortfolioForm }) =>
      coursePortfolioService.editCoursePortfolio(data, courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-portfolio'] });
      toast.success('Course portfolio has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update course portfolio', {
        description: error.message,
      });
    },
  });
};
