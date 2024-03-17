import { ApiService } from '@/services/api-service';
import { GetCoursePortfolioForm } from '@/types/schema/course-portfolio-schema';

class CoursePortfolioService extends ApiService {
  public async getCoursePortfolio(
    courseId: string,
  ): Promise<GetCoursePortfolioForm> {
    const url = `/courses/${courseId}/portfolio`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetCoursePortfolioForm;
      })
      .catch(this.throwError);
  }
}

export const coursePortfolioService = new CoursePortfolioService();
