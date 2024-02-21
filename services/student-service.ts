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
    const formData = new FormData();
    formData.append('kmuttId', student.kmuttId);
    formData.append('firstName', student.firstName);
    formData.append('lastName', student.lastName);
    formData.append('gpax', student.gpax);
    formData.append('mathGpa', student.gpaMath);
    formData.append('engGpa', student.gpaEng);
    formData.append('sciGpa', student.gpaSci);
    formData.append('school', student.school);
    formData.append('city', student.city);
    formData.append('year', student.year);
    formData.append('admission', student.admission);
    formData.append('programmeId', student.programmeId);
    formData.append('departmentName', student.departmentName);
    formData.append('email', student.email);

    return this.post(url, formData)
      .then(() => student)
      .catch(this.throwError);
  }

  public async createStudentBulk(
    students: CreateAdmissionType[],
  ): Promise<CreateAdmissionType[]> {
    const url = '/students/bulk';
    const formData = new FormData();

    students.forEach((student) => {
      formData.append('kmuttId', student.kmuttId);
      formData.append('firstName', student.firstName);
      formData.append('lastName', student.lastName);
      formData.append('gpax', student.gpax);
      formData.append('mathGpa', student.gpaMath);
      formData.append('engGpa', student.gpaEng);
      formData.append('sciGpa', student.gpaSci);
      formData.append('school', student.school);
      formData.append('city', student.city);
      formData.append('year', student.year);
      formData.append('admission', student.admission);
      formData.append('programmeId', student.programmeId);
      formData.append('departmentName', student.departmentName);
      formData.append('email', student.email);
    });

    return this.post(url, formData)
      .then(() => students)
      .catch(this.throwError);
  }
}

export const studentService = new StudentService();
