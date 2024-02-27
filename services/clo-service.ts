import { ApiService } from '@/services/api-service';
import {
  CreateCloType,
  GetCourseLearningOutcome,
  GetCourseLearningOutcomeWithSubPlo,
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

  public async getCloList(): Promise<GetCourseLearningOutcome[]> {
    const url = '/clos';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetCourseLearningOutcome[];
      })
      .catch(this.throwError);
  }

  public async getCloById(
    cloId: string,
  ): Promise<GetCourseLearningOutcomeWithSubPlo> {
    const url = `/clos/${cloId}`;

    return this.get(url)
      .then((response) => {
        return response.data
          .data as unknown as GetCourseLearningOutcomeWithSubPlo;
      })
      .catch(this.throwError);
  }

  public async getCloByCourseId(
    courseId: string,
  ): Promise<GetCourseLearningOutcome[]> {
    const url = `/courses/${courseId}/clos`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetCourseLearningOutcome[];
      })
      .catch(this.throwError);
  }
}

export const cloService = new CourseLearningOutcomeService();
