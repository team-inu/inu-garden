import CourseForm from "@/components/features/course/course-form/form";
import CourseFormHeader from "@/components/features/course/course-form/form-header";

const CreateCoursePage = () => {
  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="mb-5">
          <h1 className="text-4xl font-bold ">Create Course</h1>
          <span className="text-gray-400">define your course</span>
        </div>
        <div>
          <CourseFormHeader />
        </div>
      </div>
      {/* Form */}
      <div>
        <CourseForm />
      </div>
    </div>
  );
};

export default CreateCoursePage;
