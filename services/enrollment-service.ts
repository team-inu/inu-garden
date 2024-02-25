import { Enrollment } from '@/data/schema';
import { ApiService } from '@/services/api-service';
import { CreateEnrollmentType } from '@/types/schema/enrollment-schema';

class EnrollmentService extends ApiService {
  public async getEnrollmentList(): Promise<any> {
    const url = '/enrollments';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as Enrollment[];
      })
      .catch(this.throwError);
  }

  public async createEnrollment(
    enrollment: CreateEnrollmentType,
  ): Promise<CreateEnrollmentType> {
    const url = '/enrollments';

    return this.post(url, enrollment)
      .then(() => enrollment)
      .catch(this.throwError);
  }
}

export const enrollmentService = new EnrollmentService();
