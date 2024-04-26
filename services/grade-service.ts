import { ApiService } from '@/services/api-service';
import {
  GradeSemester,
  PayloadCreateGradeType,
} from '@/types/schema/grade-schema';

class GradeService extends ApiService {
  public async getGradeByStudentId(studentId: string) {
    const url = `/grades?studentId=${studentId}`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GradeSemester[];
      })
      .catch(this.throwError);
  }

  public async createGrade(
    payload: PayloadCreateGradeType,
  ): Promise<PayloadCreateGradeType> {
    const url = '/grades';
    return this.post(url, payload)
      .then(() => payload)
      .catch(this.throwError);
  }
}

export const gradeService = new GradeService();
