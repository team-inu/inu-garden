import { ApiService } from '@/services/api-service';
import { getSemesterList } from '@/types/schema/semsester-schema';

class SemesterService extends ApiService {
  public async getSemesterList(): Promise<getSemesterList[]> {
    const url = '/semesters';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as getSemesterList[];
      })
      .catch(this.throwError);
  }
}

export const semesterService = new SemesterService();
