import { ApiService } from '@/services/api-service';
import {
  CreateScoreForm,
  GetScoreByAssignmentResponse,
  UpdateScoreForm,
} from '@/types/schema/score-schema';

class ScoreService extends ApiService {
  public async getScoresByAssignmentId(
    assignmentId: string,
  ): Promise<GetScoreByAssignmentResponse> {
    if (assignmentId === '') {
      return { enrolledAmount: 0, submittedAmount: 0, scores: [] };
    }

    const url = `/assignments/${assignmentId}/scores/`;
    return this.get(url)
      .then(
        (response) =>
          response.data.data as unknown as GetScoreByAssignmentResponse,
      )
      .catch(this.throwError);
  }

  public async createScore(
    data: CreateScoreForm,
    assignmentId: string,
  ): Promise<CreateScoreForm> {
    const url = '/scores';
    const result = {
      studentScores: [data],
      assignmentId: assignmentId,
    };
    return this.post(url, result)
      .then(() => data)
      .catch(this.throwError);
  }

  public async updateScore(
    score: UpdateScoreForm,
    id: string,
  ): Promise<UpdateScoreForm> {
    const url = `/scores/${id}`;
    return this.patch(url, score)
      .then(() => score)
      .catch(this.throwError);
  }

  public async deleteScore(id: string) {
    const url = `/scores/${id}`;
    return this.delete(url)
      .then(() => {})
      .catch(this.throwError);
  }
}

export const scoreService = new ScoreService();
