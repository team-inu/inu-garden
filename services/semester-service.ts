import { ApiService } from '@/services/api-service';
import { CreateSemesterForm, UpdateSemesterForm, getSemesterList } from '@/types/schema/semsester-schema';

class SemesterService extends ApiService {
  public async getSemesterList(): Promise<getSemesterList[]> {
    const url = '/semesters';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as getSemesterList[];
      })
      .catch(this.throwError);
  }

  public async createSemester(semester: CreateSemesterForm): Promise<CreateSemesterForm> {
    const url = '/semesters';
    return this.post(url, semester)
      .then(() => semester)
      .catch(this.throwError);
  }

  public async updateSemester(semester: UpdateSemesterForm, id: string): Promise<UpdateSemesterForm> {
    const url = `/semesters/${id}`;
    return this.patch(url, semester)
      .then(() => semester)
      .catch(this.throwError);
  }

  public async deleteSemester(id: string) {
    const url = `/semesters/${id}`;
    return this.delete(url)
      .then(() => {})
      .catch(this.throwError);
  }
}

export const semesterService = new SemesterService();
