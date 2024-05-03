import { ApiService } from '@/services/api-service';
import {
  EnrollmentResultPloPo,
  GetCoursePortfolioForm,
  StudentResultClo,
} from '@/types/schema/course-portfolio-schema';

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

  public async getCloAndPassingCourseLearningOutcome(
    courseId: string,
  ): Promise<StudentResultClo[]> {
    const url = `/courses/${courseId}/clos/students`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as StudentResultClo[];
      })
      .catch(this.throwError);
  }

  public async getPloandPoOutcomeEnrollment(
    courseId: string,
  ): Promise<EnrollmentResultPloPo[]> {
    const url = `/courses/${courseId}/students/outcomes`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as EnrollmentResultPloPo[];
      })
      .catch(this.throwError);
  }
}

export const coursePortfolioService = new CoursePortfolioService();
