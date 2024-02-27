import { ApiService } from '@/services/api-service';
import {
  CreateSubPloType,
  GetSubPloResponse,
} from '@/types/schema/sub-plo-schema';

class SubPloService extends ApiService {
  public async getSubPloList(): Promise<GetSubPloResponse[]> {
    const url = '/splos';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as GetSubPloResponse[];
      })
      .catch(this.throwError);
  }

  public async createSubPlo(splo: CreateSubPloType): Promise<CreateSubPloType> {
    const url = '/splos';

    return this.post(url, { subProgramLearningOutcomes: [splo] })
      .then(() => splo)
      .catch(this.throwError);
  }
}

export const subPloService = new SubPloService();
