import { ApiService } from '@/services/api-service';
import {
  CreateCloForm,
  CreateCloLinkSubPloPayload,
  EditCloForm,
  GetCloResponse,
  GetCloWithSubPloResponse,
} from '@/types/schema/clo-shema';

class CourseLearningOutcomeService extends ApiService {
  public async createClo(data: CreateCloForm, courseId: string | string[]): Promise<void> {
    const url = '/clos';
    const result = {
      code: data.code,
      description: data.description,
      status: data.status,
      expectedPassingAssignmentPercentage: data.expectedPassingAssignmentPercentage,
      expectedPassingStudentPercentage: data.expectedPassingStudentPercentage,
      programOutcomeId: data.programOutcomeId,
      subProgramLearningOutcomeId: data.subProgramLearningOutcomeId.map((item) => item.value),
      courseId: courseId,
    };

    return this.post(url, result)
      .then((response) => {
        return response.data.data as unknown as void;
      })
      .catch(this.throwError);
  }

  public async createLinkSubPlo(value: CreateCloLinkSubPloPayload): Promise<CreateCloLinkSubPloPayload> {
    const url = `/clos/${value.cloId}/subplos`;
    const result = {
      subProgramLearningOutcomeId: value.subProgramLearningOutcomeId,
    };
    return this.post(url, result)
      .then(() => {
        return value;
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

  public async deleteClo(cloId: string) {
    const url = `/clos/${cloId}`;

    return this.delete(url).catch(this.throwError);
  }

  public async unLinkSubPlo(cloId: string, subPloId: string): Promise<void> {
    const url = `/clos/${cloId}/subplos/${subPloId}`;

    return this.delete(url)
      .then((response) => {
        return response.data.data as unknown as void;
      })
      .catch(this.throwError);
  }
}

export const cloService = new CourseLearningOutcomeService();
