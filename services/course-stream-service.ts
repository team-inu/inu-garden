import { ApiService } from '@/services/api-service';
import {
  CourseStream,
  CreateCourseStreamPayload,
} from '@/types/schema/course-stream-schema';

class CourseStreamService extends ApiService {
  public async getCourseStreamList() {
    const url = '/course-streams';
    return this.get(url)
      .then((response) => {
        return response.data.data;
      })
      .catch(this.throwError);
  }

  public async getCommentByCourseId(courseId: string) {
    const url = `/course-streams?targetCourseId=${courseId}`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as CourseStream[];
      })
      .catch(this.throwError);
  }

  public async createCourseStream(courseStream: CreateCourseStreamPayload) {
    const url = `/course-streams`;

    return this.post(url, courseStream)
      .then(() => courseStream)
      .catch(this.throwError);
  }
}

export const courseStreamService = new CourseStreamService();
