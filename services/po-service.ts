import { ApiService } from '@/services/api-service';
import {
  CreateManyPoForm,
  CreatePoForm,
  GetPoResponse,
} from '@/types/schema/po-schema';

class PoService extends ApiService {
  public async getPoList(): Promise<GetPoResponse[]> {
    const url = '/pos';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as GetPoResponse[];
      })
      .catch(this.throwError);
  }

  public async createPo(po: CreatePoForm): Promise<CreatePoForm> {
    const url = '/pos';

    return this.post(url, { programOutcomes: [po] })
      .then(() => po)
      .catch(this.throwError);
  }

  public async createManyPos(pos: CreateManyPoForm): Promise<CreateManyPoForm> {
    const url = '/pos';
    return this.post(url, { programOutcomes: pos.po })
      .then(() => pos)
      .catch(this.throwError);
  }
}

export const poService = new PoService();
