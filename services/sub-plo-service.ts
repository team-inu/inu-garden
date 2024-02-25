import { SubPLO } from '@/data/schema';
import { ApiService } from '@/services/api-service';
import {
  CreateSubPloType,
  ImportedSubPloType,
} from '@/types/schema/sub-plo-schema';

class SubPloService extends ApiService {
  public async getSubPloList(): Promise<any> {
    const url = '/splos';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as SubPLO[];
      })
      .catch(this.throwError);
  }

  public async createSubPlo(splo: CreateSubPloType): Promise<CreateSubPloType> {
    const url = '/splos';

    return this.post(url, splo)
      .then(() => splo)
      .catch(this.throwError);
  }

  public async createSubPloBulk(
    splos: ImportedSubPloType[],
  ): Promise<ImportedSubPloType[]> {
    const url = '/splos/bulk';
    const result = {
      splos: splos,
    };
    return this.post(url, result)
      .then(() => splos)
      .catch(this.throwError);
  }
}

export const subPloService = new SubPloService();
