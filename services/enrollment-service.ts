import { ApiService } from '@/services/api-service';
import {
  CreateEnrollmentForm,
  CreateEnrollmentPayload,
  EditEnrollmentPayload,
  GetEnrollmentResponse,
} from '@/types/schema/enrollment-schema';

class EnrollmentService extends ApiService {
  public async getEnrollmentsByCourseId(
    courseId: string,
  ): Promise<GetEnrollmentResponse[]> {
    const url = `/courses/${courseId}/enrollments`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetEnrollmentResponse[];
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

    return this.post(url, result)
      .then(() => enrollment)
      .catch(this.throwError);
  }

  public async editEnrollment(
    enrollment: EditEnrollmentPayload,
  ): Promise<EditEnrollmentPayload> {
    const url = `/enrollments/${enrollment.id}`;

    return this.patch(url, enrollment)
      .then(() => enrollment)
      .catch(this.throwError);
  }

  public async deleteEnrollment(enrollmentId: string) {
    const url = `/enrollments/${enrollmentId}`;
    return this.delete(url).catch(this.throwError);
  }

  private isCreateManyEnrollment(
    enrollment: CreateEnrollmentPayload | CreateEnrollmentForm,
  ): enrollment is CreateEnrollmentPayload {
    return 'studentIds' in enrollment;
  }
}

export const enrollmentService = new EnrollmentService();
