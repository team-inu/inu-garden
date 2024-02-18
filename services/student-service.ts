import { Admission } from '@/data/schema';
import { ApiService } from '@/services/api-service';

class StudentService extends ApiService {
  public async getStudentList(): Promise<any> {
    const url = '/students';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as Admission[];
      })
      .catch(this.throwError);
  }
}

export const studentService = new StudentService();
