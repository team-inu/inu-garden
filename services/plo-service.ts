import { ApiService } from '@/services/api-service';
import {
  CreateManyPloForm,
  CreatePloForm,
  GetProgramLearningOutcomeResponse,
} from '@/types/schema/plo-schema';
import { CreateManySubPloType } from '@/types/schema/sub-plo-schema';

class PloService extends ApiService {
  public async getPloList(): Promise<GetProgramLearningOutcomeResponse[]> {
    const url = '/plos';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as GetProgramLearningOutcomeResponse[];
      })
      .catch(this.throwError);
  }

  public async createPlo(plo: CreatePloForm): Promise<CreatePloForm> {
    const url = '/plos';

    return this.post(url, { programLearningOutcomes: [plo] })
      .then(() => plo)
      .catch(this.throwError);
  }

  public async createManyPlos(
    plos: CreateManyPloForm,
    splos: CreateManySubPloType,
  ): Promise<CreateManyPloForm> {
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

  public async updatePlo(
    plo: CreatePloForm,
    id: string,
  ): Promise<CreatePloForm> {
    const url = `/plos/${id}`;
    return this.patch(url, { programLearningOutcomes: [plo] })
      .then(() => plo)
      .catch(this.throwError);
  }

  public async deletePlo(id: string) {
    const url = `/plos/${id}`;
    return this.delete(url)
      .then(() => {})
      .catch(this.throwError);
  }
}

export const ploService = new PloService();
