import { CreateCourseSchemaValues } from "@/types/schema/course-schema";
import { ApiService } from "./api-service";

class CourseService extends ApiService {
  public async createCourse(
    course: CreateCourseSchemaValues
  ): Promise<CreateCourseSchemaValues> {
    const url = "/course";

    const formData = new FormData();
    formData.append("name", course.name);
    formData.append("code", course.code);
    formData.append("lecturer", course.lecturer);
    formData.append("semester", course.semester);
    formData.append("description", course.description);
    formData.append("a", course.grade.a);
    formData.append("b", course.grade.b);
    formData.append("c", course.grade.c);
    formData.append("d", course.grade.d);
    formData.append("f", course.grade.f);
    formData.append(
      "courseLearningOutcomes",
      JSON.stringify(course.courseLearningOutcome)
    );

    return this.post(url, formData)
      .then(() => course)
      .catch(this.throwError);
  }
}

export const courseService = new CourseService();
