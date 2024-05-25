import { ApiService } from '@/services/api-service';
import {
  CreateStudentForm,
  GetStudentResponse,
  GetStudentWithOutcomes,
  UpdateStudentForm,
} from '@/types/schema/student-schema';

class StudentService extends ApiService {
  public async getStudentList(): Promise<GetStudentResponse[]> {
    const url = '/students';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetStudentResponse[];
      })
      .catch(this.throwError);
  }

  public async getStudentById(studentId: string): Promise<GetStudentResponse> {
    const url = `/students/${studentId}`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetStudentResponse;
      })
      .catch(this.throwError);
  }

  public async getSchools(): Promise<{ schools: string[] }> {
    const url = '/schools';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as { schools: string[] };
      })
      .catch(this.throwError);
  }

  public async getAdmissions(): Promise<{ admissions: string[] }> {
    const url = '/admissions';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as { admissions: string[] };
      })
      .catch(this.throwError);
  }

  public async getStudentWithOutcomes(studentId: string): Promise<GetStudentWithOutcomes[]> {
    const url = `/students/${studentId}/outcomes`;
    console.log('===================================');
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetStudentWithOutcomes[];
      })
      .catch(this.throwError);
  }

  public async createStudent(student: CreateStudentForm): Promise<CreateStudentForm> {
    const url = '/students';

    return this.post(url, student)
      .then(() => student)
      .catch(this.throwError);
  }

  public async createStudentBulk(students: CreateStudentForm[]): Promise<CreateStudentForm[]> {
    const url = '/students/bulk';
    const result = {
      students: students,
    };
    return this.post(url, result)
      .then(() => students)
      .catch(this.throwError);
  }

  public async updateStudent(studentId: string, student: UpdateStudentForm): Promise<UpdateStudentForm> {
    const url = `/students/${studentId}`;

    return this.patch(url, student)
      .then(() => student)
      .catch(this.throwError);
  }

  public async deleteStudent(id: string) {
    const url = `/students/${id}`;
    return this.delete(url)
      .then(() => {})
      .catch(this.throwError);
  }
}

export const studentService = new StudentService();
