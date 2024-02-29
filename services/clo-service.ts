import { ApiService } from '@/services/api-service';
import {
  CreateCloForm,
  EditCloForm,
  GetCloResponse,
  GetCloWithSubPloResponse,
} from '@/types/schema/clo-shema';

class CourseLearningOutcomeService extends ApiService {
  public async createClo(
    data: CreateCloForm,
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

  public async getCloList(): Promise<GetCloResponse[]> {
    const url = '/clos';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetCloResponse[];
      })
      .catch(this.throwError);
  }

  public async getCloById(cloId: string): Promise<GetCloWithSubPloResponse> {
    const url = `/clos/${cloId}`;

    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetCloWithSubPloResponse;
      })
      .catch(this.throwError);
  }

  public async getCloByCourseId(courseId: string): Promise<GetCloResponse[]> {
    const url = `/courses/${courseId}/clos`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetCloResponse[];
      })
      .catch(this.throwError);
  }

  public async updateClo(cloId: string, data: EditCloForm): Promise<void> {
    const url = `/clos/${cloId}`;

    return this.patch(url, data)
      .then((response) => {
        return response.data.data as unknown as void;
      })
      .catch(this.throwError);
  }
}

export const cloService = new CourseLearningOutcomeService();
