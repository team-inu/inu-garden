import { ApiService } from '@/services/api-service';
import {
  CreateCloType,
  GetCourseLearningOutcomeList,
} from '@/types/schema/clo-shema';

class CourseLearningOutcomeService extends ApiService {
  public async createClo(
    data: CreateCloType,
    courseId: string | string[],
  ): Promise<void> {
    const url = '/clos';
    const result = {
      code: data.code,
      description: data.description,
      status: data.status,
      expectedPassingAssignmentPercentage:
        data.expectedPassingAssignmentPercentage,
      expectedScorePercentage: data.expectedScorePercentage,
      expectedPassingStudentPercentage: data.expectedPassingStudentPercentage,
      programOutcomeId: data.programOutcomeId,
      subProgramLearningOutcomeId: data.subProgramLearningOutcomeId.map(
        (item) => item.value,
      ),
      courseId: courseId,
    };
    console.log(result);
    return this.post(url, result)
      .then((response) => {
        return response.data.data as unknown as void;
      })
      .catch(this.throwError);
  }

  public async getCloList(): Promise<GetCourseLearningOutcomeList[]> {
    const url = '/clos';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetCourseLearningOutcomeList[];
      })
      .catch(this.throwError);
  }

  public async getCloByCourseId(
    courseId: string,
  ): Promise<GetCourseLearningOutcomeList[]> {
    const url = `/courses/${courseId}/clos`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetCourseLearningOutcomeList[];
      })
      .catch(this.throwError);
  }
}

export const cloService = new CourseLearningOutcomeService();
