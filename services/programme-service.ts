import { ApiService } from '@/services/api-service';
import { GetProgrammeList } from '@/types/schema/programme-schema';

class ProgrammeService extends ApiService {
  public async getProgrammeList(): Promise<GetProgrammeList[]> {
    const url = '/programmes';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetProgrammeList[];
      })
      .catch(this.throwError);
  }
}

export const programmeService = new ProgrammeService();
