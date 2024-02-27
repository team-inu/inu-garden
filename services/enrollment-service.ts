import { ApiService } from '@/services/api-service';
import {
  CreateEnrollmentForm,
  CreateEnrollmentPayload,
  GetEnrollmentResponse,
} from '@/types/schema/enrollment-schema';

class EnrollmentService extends ApiService {
  public async getEnrollmentList(): Promise<any> {
    const url = '/enrollments';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as GetEnrollmentResponse[];
      })
      .catch(this.throwError);
  }

  public async createEnrollment(
    enrollment: CreateEnrollmentPayload | CreateEnrollmentForm,
  ): Promise<CreateEnrollmentPayload | CreateEnrollmentForm> {
    const url = '/enrollments';

    if (this.isCreateManyEnrollment(enrollment)) {
      return this.post(url, enrollment)
        .then(() => enrollment)
        .catch(this.throwError);
    }

    const result = {
      ...enrollment,
      studentIds: [enrollment.studentId],
    };

    console.log(result);

    return this.post(url, result)
      .then(() => enrollment)
      .catch(this.throwError);
  }

  private isCreateManyEnrollment(
    enrollment: CreateEnrollmentPayload | CreateEnrollmentForm,
  ): enrollment is CreateEnrollmentPayload {
    return 'studentIds' in enrollment;
  }
}

export const enrollmentService = new EnrollmentService();
