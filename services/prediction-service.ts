import { ApiService } from '@/services/api-service';
import { PredictGradeForm, PredictionGradeResponse } from '@/types/schema/prediction-schema';

class PredictionService extends ApiService {
  public async predictGrade(inputPrediction: PredictGradeForm): Promise<PredictionGradeResponse> {
    const url = '/prediction/predict';
    return this.post(url, inputPrediction)
      .then((response) => {
        return response.data.data as unknown as PredictionGradeResponse;
      })
      .catch(this.throwError);
  }
}

export const predictionService = new PredictionService();
