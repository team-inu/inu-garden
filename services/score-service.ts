import { ApiService } from '@/services/api-service';
import { CreateScoreForm, GetScoreResponse } from '@/types/schema/score-schema';

class ScoreService extends ApiService {
  public async getScores(): Promise<GetScoreResponse[]> {
    const url = '/scores';
    return this.get(url)
      .then((response) => response.data.data as unknown as GetScoreResponse[])
      .catch(this.throwError);
  }

  public async createScore(
    data: CreateScoreForm,
    assignmentId: string,
  ): Promise<CreateScoreForm> {
    const url = '/scores';
    const result = {
      studentScores: [data],
      lecturerId: '01HQE0N3SWK4QEYK7Y24CJETHX', //Todo: get lecturer id from session backend
      assignmentId: assignmentId,
    };
    return this.post(url, result)
      .then(() => data)
      .catch(this.throwError);
  }
}

export const scoreService = new ScoreService();
