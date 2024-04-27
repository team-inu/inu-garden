import { ApiService } from '@/services/api-service';
import { CreateCourseStreamPayload } from '@/types/schema/course-stream-schema';

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
    const url = `/courses/${courseId}/comments`;
    return this.get(url)
      .then((response) => {
        return response.data.data;
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
