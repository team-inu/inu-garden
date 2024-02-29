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

  public async createLecturer(lecturer: CreateLecturerForm): Promise<void> {
    const url = `/lecturers`;

    this.post(url, lecturer)
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
    lecturerId: string,
    lecturer: EditLecturerForm,
  ): Promise<void> {
    const url = `/lecturers/${lecturerId}`;

    this.patch(url, lecturer)
      .then(() => lecturer)
      .catch(this.throwError);
  }
}

export const lecturerService = new LecturerService();
