import { ApiService } from '@/services/api-service';
import {
  CreateAssignmentGroupForm,
  GetAssignmentGroupResponse,
  UpdateAssignmentGroupForm,
} from '@/types/schema/assignment-group-schema';

class AssignmentGroupService extends ApiService {
  public async createAssignmentGroup(
    assignment: CreateAssignmentGroupForm,
  ): Promise<CreateAssignmentGroupForm> {
    const url = '/assignment-groups';

    return this.post(url, assignment)
      .then(() => assignment)
      .catch(this.throwError);
  }

  public async updateAssignmentGroup(
    assignment: UpdateAssignmentGroupForm,
  ): Promise<UpdateAssignmentGroupForm> {
    const url = `/assignment-groups/${assignment.id}`;

    return this.patch(url, assignment)
      .then(() => assignment)
      .catch(this.throwError);
  }

  public async getAssignmentGroupsByCourseId(
    courseId: string,
  ): Promise<GetAssignmentGroupResponse[]> {
    const url = `/courses/${courseId}/assignment-groups`;
    return this.get(url)
      .then(
        (response) =>
          response.data.data as unknown as GetAssignmentGroupResponse[],
      )
      .catch(this.throwError);
  }

  public async deleteAssignmentGroup(assignmentId: string) {
    const url = `/assignment-groups/${assignmentId}`;
    return this.delete(url).catch(this.throwError);
  }
}

export const assignmentGroupService = new AssignmentGroupService();
