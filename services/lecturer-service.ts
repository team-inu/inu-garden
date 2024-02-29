import { ApiService } from '@/services/api-service';
import {
  CreateLecturerForm,
  CreateManyLecturerForm,
  EditLecturerForm,
  GetLecturerResponse,
} from '@/types/schema/lecturer-schema';

class LecturerService extends ApiService {
  public async getLecturerList(): Promise<GetLecturerResponse[]> {
    const url = '/lecturers';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetLecturerResponse[];
      })
      .catch(this.throwError);
  }

  public async createLecturer(
    lecturer: CreateLecturerForm,
  ): Promise<CreateLecturerForm> {
    const url = '/lecturers';
    const formData = new FormData();
    formData.append('firstName', lecturer.firstName);
    formData.append('lastName', lecturer.lastName);
    formData.append('email', lecturer.email);
    formData.append('password', lecturer.password);
    return this.post(url, formData)
      .then(() => lecturer)
      .catch(this.throwError);
  }

  public async createManyLecturer(
    lecturers: CreateManyLecturerForm,
  ): Promise<CreateManyLecturerForm> {
    const url = '/lecturers/bulk';

    console.log(lecturers);
    return this.post(url, lecturers)
      .then(() => lecturers)
      .catch(this.throwError);
  }

  public async updateLecturer(
    lecturer: EditLecturerForm,
    lecturerId: string,
  ): Promise<EditLecturerForm> {
    const url = `/lecturers/${lecturerId}`;
    const formData = new FormData();
    formData.append('firstName', lecturer.firstName);
    formData.append('lastName', lecturer.lastName);
    formData.append('email', lecturer.email);
    return this.put(url, formData)
      .then(() => lecturer)
      .catch(this.throwError);
  }
}

export const lecturerService = new LecturerService();
