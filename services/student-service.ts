import { ApiService } from '@/services/api-service';
import {
  CreateStudentForm,
  GetStudentResponse,
  UpdateStudentForm,
} from '@/types/schema/student-schema';

class StudentService extends ApiService {
  public async getStudentList(): Promise<any> {
    const url = '/students';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetStudentResponse[];
      })
      .catch(this.throwError);
  }

  public async createStudent(
    student: CreateStudentForm,
  ): Promise<CreateStudentForm> {
    const url = '/students';

    return this.post(url, student)
      .then(() => student)
      .catch(this.throwError);
  }

  public async createStudentBulk(
    students: CreateStudentForm[],
  ): Promise<CreateStudentForm[]> {
    const url = '/students/bulk';
    const result = {
      students: students,
    };
    return this.post(url, result)
      .then(() => students)
      .catch(this.throwError);
  }

  public async updateStudent(
    studentId: string,
    student: UpdateStudentForm,
  ): Promise<void> {
    const url = `/students/${studentId}`;

    this.patch(url, student)
      .then(() => student)
      .catch(this.throwError);
  }
}

export const studentService = new StudentService();
