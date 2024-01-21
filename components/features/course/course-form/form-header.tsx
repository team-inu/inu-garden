"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tableToObject, worksheetToTables } from "@/libs/excel";
import { CreateCourseSchemaValues } from "@/types/schema/course-schema";
import { TimerIcon, ImportIcon } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import * as XLSX from "xlsx";

const CourseFormHeader = () => {
  const formCtx = useFormContext<CreateCourseSchemaValues>();
  const fileImportRef = useRef<HTMLInputElement>(null);
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return toast.error("Can not read file");
    }

    const buffer = await file.arrayBuffer();
    const workBook = XLSX.read(buffer, { type: "buffer" });

    const sheet1 = workBook.Sheets[workBook.SheetNames[0]];

    const [infoTable, CLOTable] = await worksheetToTables(sheet1);

    const [info] = tableToObject(infoTable[0], infoTable.slice(1));
    const clo = tableToObject(CLOTable[0], CLOTable.slice(1));

    formCtx.reset({
      name: info["CourseTitle"],
      code: info["_CourseID"],
      semester: info["Semester"],
      lecturer: "a",
      description: "",
      courseLearningOutcome: clo.map((c) => ({
        code: c["_No."],
        description: c["Course Learning Outcomes (CLOs)"],
        programOutcome: c["KMUTT PLO"],
        subProgramLearningOutcome: "",
        weight: "",
      })),
    });
  };

  return (
    <div className="space-x-5">
      <Input
        type="file"
        className="hidden"
        ref={fileImportRef}
        onChange={handleUpload}
      />
      <Button
        variant={"secondary"}
        className="space-x-3"
        onClick={() => fileImportRef.current?.click()}
      >
        <ImportIcon className="w-5 h-5" />
        <div className="">Import</div>
      </Button>
      <Button variant={"secondary"} className="space-x-3">
        <TimerIcon className="w-5 h-5" />
        <div className="">History</div>
      </Button>
    </div>
  );
};

export default CourseFormHeader;
