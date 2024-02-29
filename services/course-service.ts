import { ApiService } from '@/services/api-service';
import {
  CreateCourseSchemaValues,
  GetCourseList,
} from '@/types/schema/course-schema';

class CourseService extends ApiService {
  public async createCourse(
    course: CreateCourseSchemaValues,
  ): Promise<CreateCourseSchemaValues> {
    const url = '/courses';

    return this.post(url, course)
      .then(() => course)
      .catch(this.throwError);
  }

  public async getStudentEnrollList(): Promise<any> {
    const url = '/students';
    return this.get(url)
      .then((response) => {
        return response.data;
      })
      .catch(this.throwError);
  }

  public async getCourseList(): Promise<GetCourseList[]> {
    const url = '/courses';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetCourseList[];
      })
      .catch(this.throwError);
  }

  public async getCourseById(id: string): Promise<GetCourseList> {
    const url = `/courses/${id}`;
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetCourseList;
      })
      .catch(this.throwError);
  }

  public async getCourseByYear(year: string): Promise<any> {
    const url = `/course/year/${year}`;
    return this.get(url)
      .then((response) => {
        return response.data.data;
      })
      .catch(this.throwError);
  }

  public async getCourseListByLecturer(lecturerId: string): Promise<any> {
    const url = `/course/lecturer/${lecturerId}`;
    return this.get(url)
      .then((response) => {
        return response.data.data;
      })
      .catch(this.throwError);
  }
}

export const courseService = new CourseService();
