import { ApiService } from '@/services/api-service';
import {
  CreateAssignmentForm,
  GetAssignmentByIdResponse,
  GetAssignmentResponse,
} from '@/types/schema/assignment-schema';

class AssignmentService extends ApiService {
  public async createAssignment(
    assignment: CreateAssignmentForm,
  ): Promise<CreateAssignmentForm> {
    const url = '/assignments';
    const result = {
      name: assignment.name,
      description: assignment.description,
      maxScore: assignment.maxScore,
      expectedScorePercentage: assignment.expectedScorePercentage,
      expectedPassingStudentPercentage:
        assignment.expectedPassingStudentPercentage,
      weight: assignment.weight,
      courseLearningOutcomeIds: assignment.clo.map((clo) => clo.value),
    };
    return this.post(url, result)
      .then(() => assignment)
      .catch(this.throwError);
  }

  public async getAssignmentsByCourseId(
    courseId: string,
  ): Promise<GetAssignmentResponse[]> {
    const url = `/courses/${courseId}/assignments`;
    return this.get(url)
      .then(
        (response) => response.data.data as unknown as GetAssignmentResponse[],
      )
      .catch(this.throwError);
  }

  public async getAssignmentById(
    assignmentId: string,
  ): Promise<GetAssignmentByIdResponse> {
    const url = `/assignments/${assignmentId}`;
    return this.get(url)
      .then(
        (response) =>
          response.data.data as unknown as GetAssignmentByIdResponse,
      )
      .catch(this.throwError);
  }
}

export const assignmentService = new AssignmentService();
