import { ApiService } from '@/services/api-service';
import { GetFacultyResponse } from '@/types/schema/department-schema';

class DepartmentService extends ApiService {
  public async getDepartments(): Promise<GetFacultyResponse[]> {
    const url = '/departments';

    return this.get(url)
      .then((response) => response.data.data as unknown as GetFacultyResponse[])
      .catch(this.throwError);
  }

  public async getStudentEnrollList(): Promise<any> {
    const url = '/students';
    return this.get(url)
      .then((response) => {
        return response.data.data;
      })
      .catch(this.throwError);
  }
}

export const departmentService = new DepartmentService();
