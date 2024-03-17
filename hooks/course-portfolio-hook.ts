import { useQuery } from '@tanstack/react-query';

import { coursePortfolioService } from '@/services/course-portfolio-service';

export const useGetCoursePortfolio = (courseId: string) =>
  useQuery({
    queryKey: ['course-portfolio', courseId],
    queryFn: () => coursePortfolioService.getCoursePortfolio(courseId),
  });
