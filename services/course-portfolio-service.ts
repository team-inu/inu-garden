import { ApiService } from '@/services/api-service';
import {
  EnrollmentResults,
  GetCoursePortfolioForm,
  SaveCoursePortfolioForm,
  StudentResultClo,
} from '@/types/schema/course-portfolio-schema';

class CoursePortfolioService extends ApiService {
  public async getCoursePortfolio(courseId: string): Promise<GetCoursePortfolioForm> {
    const url = `/courses/${courseId}/portfolio`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetCoursePortfolioForm;
      })
      .catch(this.throwError);
  }

  public async getCloAndPassingCourseLearningOutcome(courseId: string): Promise<StudentResultClo[]> {
    const url = `/courses/${courseId}/clos/students`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as StudentResultClo[];
      })
      .catch(this.throwError);
  }

  public async getPloandPoOutcomeEnrollment(courseId: string): Promise<EnrollmentResults[]> {
    const url = `/courses/${courseId}/students/outcomes`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as EnrollmentResults[];
      })
      .catch(this.throwError);
  }

  public async editCoursePortfolio(data: SaveCoursePortfolioForm, courseId: string): Promise<void> {
    const url = `/courses/${courseId}/portfolio`;
    //array object to array of string
    let result = {
      summary: {
        ...data.summary,
        teachingMethods: data.summary.teachingMethods.map((e) => e.name),
        objectives: data.summary.objectives.map((e) => e.name),
      },
      development: {
        ...data.development,
        plans: data.development.plans.map((e) => e.name),
        doAndChecks: data.development.doAndChecks.map((e) => e.name),
        acts: data.development.acts.map((e) => e.name),
        subjectComments: {
          upstreamSubjects: data.development.subjectComments.upstreamSubjects.map((e) => {
            return {
              courseName: e.courseName,
              comments: e.comments,
            };
          }),
          downstreamSubjects: data.development.subjectComments.downstreamSubjects.map((e) => {
            return {
              courseName: e.courseName,
              comments: e.comments,
            };
          }),
          other: data.development.subjectComments.other,
        },
        otherComment: data.development.otherComment,
      },
    };

    return this.patch(url, result)
      .then(() => {
        return;
      })
      .catch(this.throwError);
  }
}

export const coursePortfolioService = new CoursePortfolioService();
