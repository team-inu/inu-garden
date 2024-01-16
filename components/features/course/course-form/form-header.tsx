import { Button } from "@/components/ui/button";
import { ImportIcon, TimerIcon } from "lucide-react";

const CourseFormHeader = () => {
  return (
    <div className="space-x-5">
      <Button variant={"secondary"} className="space-x-3">
        <ImportIcon className="w-5 h-5" />
        <div className="">Import file</div>
      </Button>
      <Button variant={"secondary"} className="space-x-3">
        <TimerIcon className="w-5 h-5" />
        <div className="">History</div>
      </Button>
    </div>
  );
};

export default CourseFormHeader;
