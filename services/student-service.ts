import { ApiService } from '@/services/api-service';
import {
  CreateStudentPayload,
  GetStudentResponse,
} from '@/types/schema/student-schema';

class StudentService extends ApiService {
  public async getStudentList(): Promise<any> {
    const url = '/students';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as GetStudentResponse[];
      })
      .catch(this.throwError);
  }

  public async createStudent(
    student: CreateStudentPayload,
  ): Promise<CreateStudentPayload> {
    const url = '/students';

    return this.post(url, student)
      .then(() => student)
      .catch(this.throwError);
  }

  public async createStudentBulk(
    students: CreateStudentPayload[],
  ): Promise<CreateStudentPayload[]> {
    const url = '/students/bulk';
    const result = {
      students: students,
    };
    return this.post(url, result)
      .then(() => students)
      .catch(this.throwError);
  }
}

export const studentService = new StudentService();
