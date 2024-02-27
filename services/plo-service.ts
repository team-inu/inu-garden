import { ApiService } from '@/services/api-service';
import {
  CreateManyPloType,
  CreatePloType,
  GetProgramLearningOutcomeList,
} from '@/types/schema/plo-schema';
import { CreateManySubPloType } from '@/types/schema/sub-plo-schema';

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

    return this.post(url, { programLearningOutcomes: [plo] })
      .then(() => plo)
      .catch(this.throwError);
  }

  public async createManyPlos(
    plos: CreateManyPloType,
    splos: CreateManySubPloType,
  ): Promise<CreateManyPloType> {
    const url = '/plos';

    let payload: any = [...plos.plo];

    plos.plo.forEach((plo, i) => {
      payload[i].subProgramLearningOutcomes = splos.splo.filter(
        (splo) => splo.code.split('.')[0] === plo.code,
      );
    });
    return this.post(url, { programLearningOutcomes: payload })
      .then(() => plos)
      .catch(this.throwError);
  }
}

export const ploService = new PloService();
