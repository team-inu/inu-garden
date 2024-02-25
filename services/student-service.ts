import { Student } from '@/data/schema';
import { ApiService } from '@/services/api-service';
import {
  CreateStudentType,
  ImportedStudentType,
} from '@/types/schema/student-schema';

class StudentService extends ApiService {
  public async getStudentList(): Promise<any> {
    const url = '/students';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as Student[];
      })
      .catch(this.throwError);
  }

  public async createStudent(
    student: CreateStudentType,
  ): Promise<CreateStudentType> {
    const url = '/students';

    return this.post(url, student)
      .then(() => student)
      .catch(this.throwError);
  }

  public async createStudentBulk(
    students: ImportedStudentType[],
  ): Promise<ImportedStudentType[]> {
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
