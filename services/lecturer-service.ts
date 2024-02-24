import { ApiService } from '@/services/api-service';
import {
  CreateLecturerType,
  EditLecturerType,
  GetLecturerList,
} from '@/types/schema/lecturer-schema';

class LecturerService extends ApiService {
  public async getLecturerList(): Promise<GetLecturerList[]> {
    const url = '/lecturers';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as GetLecturerList[];
      })
      .catch(this.throwError);
  }

  public async createLecturer(
    lecturer: CreateLecturerType,
  ): Promise<CreateLecturerType> {
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

  public async updateLecturer(
    lecturer: EditLecturerType,
    lecturerId: string,
  ): Promise<EditLecturerType> {
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
