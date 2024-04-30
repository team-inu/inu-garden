import { useQuery } from '@tanstack/react-query';

import { coursePortfolioService } from '@/services/course-portfolio-service';

export const useGetCoursePortfolio = (courseId: string) =>
  useQuery({
    queryKey: ['course-portfolio', courseId],
    queryFn: () => coursePortfolioService.getCoursePortfolio(courseId),
  });

export const useGetCloAndPassingCourseLearningOutcome = (courseId: string) =>
  useQuery({
    queryKey: ['clo-and-passing-clo', 'clo', courseId],
    queryFn: () =>
      coursePortfolioService.getCloAndPassingCourseLearningOutcome(courseId),
  });
