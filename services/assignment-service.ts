import { ApiService } from '@/services/api-service';
import {
  CreateAssignmentType,
  GetAssignmentListType,
} from '@/types/schema/assignment-schema';

class AssignmentService extends ApiService {
  public async createAssignment(
    assignment: CreateAssignmentType,
  ): Promise<CreateAssignmentType> {
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

  public async getAssignments(): Promise<GetAssignmentListType[]> {
    const url = '/assignments';
    return this.get(url)
      .then(
        (response) => response.data.data as unknown as GetAssignmentListType[],
      )
      .catch(this.throwError);
  }
}

export const assignmentService = new AssignmentService();
