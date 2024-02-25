import { ApiService } from '@/services/api-service';
import {
  CreatePloType,
  GetProgramLearningOutcomeList,
  ImportedPloType,
} from '@/types/schema/plo-schema';

class PloService extends ApiService {
  public async getPloList(): Promise<GetProgramLearningOutcomeList[]> {
    const url = '/plos';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as GetProgramLearningOutcomeList[];
      })
      .catch(this.throwError);
  }

  public async createPlo(plo: CreatePloType): Promise<CreatePloType> {
    const url = '/plos';

    return this.post(url, plo)
      .then(() => plo)
      .catch(this.throwError);
  }

  public async createPloBulk(
    plos: ImportedPloType[],
  ): Promise<ImportedPloType[]> {
    const url = '/plos/bulk';
    const result = {
      plos: plos,
    };
    return this.post(url, result)
      .then(() => plos)
      .catch(this.throwError);
  }
}

export const ploService = new PloService();
