import CourseCard from "@/components/features/course/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CoursePage = () => {
  return (
    <div className="w-10/12 mx-auto py-8">
      <div className="mb-16 flex items-center  space-x-3">
        <Input
          type="search"
          placeholder="Search..."
          className="dark:bg-input"
        />
        <div className="w-1/4">
          <Button variant={"default"} className="text-base font-bold">
            Add course
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};

export default CoursePage;
