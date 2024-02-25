import { ApiService } from '@/services/api-service';
import {
  CreateManyPoType,
  CreatePoType,
  GetPoList,
} from '@/types/schema/po-schema';

class PoService extends ApiService {
  public async getPoList(): Promise<GetPoList[]> {
    const url = '/pos';
    return this.get(url)
      .then((response) => {
        return response.data as unknown as GetPoList[];
      })
      .catch(this.throwError);
  }

  public async createPo(po: CreatePoType): Promise<CreatePoType> {
    const url = '/pos';

    return this.post(url, po)
      .then(() => po)
      .catch(this.throwError);
  }

  public async createManyPos(pos: CreateManyPoType): Promise<CreateManyPoType> {
    const url = '/pos';
    return this.post(url, pos)
      .then(() => pos)
      .catch(this.throwError);
  }
}

export const poService = new PoService();
