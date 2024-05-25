import { ApiService } from '@/services/api-service';
import { CreateManyPoForm, CreatePoForm, GetCourseWithPo, GetPoResponse, UpdatePoForm } from '@/types/schema/po-schema';

class PoService extends ApiService {
  public async getPoList(): Promise<GetPoResponse[]> {
    const url = '/pos';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetPoResponse[];
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

  public async updatePo(po: UpdatePoForm, id: string): Promise<UpdatePoForm> {
    const url = `/pos/${id}`;
    return this.patch(url, po)
      .then(() => po)
      .catch(this.throwError);
  }

  public async deletePo(id: string) {
    const url = `/pos/${id}`;
    return this.delete(url)
      .then(() => {})
      .catch(this.throwError);
  }

  public async getCourseLinkPo(): Promise<GetCourseWithPo[]> {
    const url = `/pos/courses`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetCourseWithPo[];
      })
      .catch(this.throwError);
  }
}

export const poService = new PoService();
