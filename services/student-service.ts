import { Admission } from '@/data/schema';
import { ApiService } from '@/services/api-service';
import { CreateAdmissionType } from '@/types/schema/admission-schema';

class StudentService extends ApiService {
  public async getStudentList(): Promise<any> {
    const url = '/students';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as Admission[];
      })
      .catch(this.throwError);
  }

  public async createStudent(
    student: CreateAdmissionType,
  ): Promise<CreateAdmissionType> {
    const url = '/students';

    return this.post(url, student)
      .then(() => student)
      .catch(this.throwError);
  }

  public async createStudentBulk(
    students: CreateAdmissionType[],
  ): Promise<CreateAdmissionType[]> {
    const url = '/students/bulk';

    return this.post(url, students)
      .then(() => students)
      .catch(this.throwError);
  }
}

export const studentService = new StudentService();
