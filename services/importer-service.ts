import { ApiService } from '@/services/api-service';
import { ImportCourse } from '@/types/schema/importer-schema';

class ImporterService extends ApiService {
  public async importCourse(payload: ImportCourse): Promise<ImportCourse> {
    const url = '/importer';
    return this.post(url, payload)
      .then(() => payload)
      .catch(this.throwError);
  }
}

export const importerService = new ImporterService();
