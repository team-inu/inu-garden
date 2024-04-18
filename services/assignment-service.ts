import { ApiService } from '@/services/api-service';
import {
  CreateAssigmentLinkCloPayload,
  CreateAssignmentForm,
  GetAssignmentByIdResponse,
  GetAssignmentResponse,
  UpdateAssignmentForm,
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
      isIncludedInClo: assignment.isIncludedInClo,
    };
    return this.post(url, result)
      .then(() => assignment)
      .catch(this.throwError);
  }

  public async updateAssignment(
    assignment: UpdateAssignmentForm,
  ): Promise<UpdateAssignmentForm> {
    const url = `/assignments/${assignment.id}`;

    return this.patch(url, assignment)
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

  public async deleteAssignment(assignmentId: string) {
    const url = `/assignments/${assignmentId}`;
    return this.delete(url).catch(this.throwError);
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

  public async linkClo(
    value: CreateAssigmentLinkCloPayload,
  ): Promise<CreateAssigmentLinkCloPayload> {
    const url = `/assignments/${value.assignmentId}/clos`;
    const result = {
      courseLearningOutcomeIds: value.courseLearningOutcomeIds,
    };

    return this.post(url, result)
      .then(() => {
        return value;
      })
      .catch(this.throwError);
  }

  public async unLinkClo(assignmentId: string, cloId: string): Promise<void> {
    const url = `/assignments/${assignmentId}/clos/${cloId}`;

    return this.delete(url)
      .then((response) => {
        return response.data.data as unknown as void;
      })
      .catch(this.throwError);
  }
}

export const assignmentService = new AssignmentService();
