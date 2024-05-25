import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { predictionService } from '@/services/prediction-service';
import { PredictGradeForm } from '@/types/schema/prediction-schema';

export const usePredictGrade = () => {
  return useMutation({
    mutationFn: (inputPrediction: PredictGradeForm) => predictionService.predictGrade(inputPrediction),
    onError: (error) => {
      toast.error('Failed to predict grade', {
        description: error.message,
      });
    },
    onSuccess: (data) => {
      toast.success('Grade has been predicted', {
        description: `Predicted grade: ${data.predictedGPAX}`,
      });
    },
  });
};
