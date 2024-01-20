"use client";

import { GraduationDataTable } from "@/components/features/graduation/graduation-table";
import { columns } from "@/components/features/graduation/graduation-column";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GraduationPage = () => {
  return (
    <div className="w-10/12 mx-auto py-8">
      <div className="flex items-center justify-between w-full space-x-3 mx-auto">
        <h1 className="text-4xl font-bold mb-5">Graduation</h1>
        <div className="w-1/12">
          <Button variant={"default"} className="text-base font-bold">
            Add Graduation form
          </Button>
        </div>
      </div>
      <div className="">
        <GraduationDataTable
          columns={columns}
          data={[
            {
              id: "1",
              studentId: "6307050000",
              firstName: "กกก",
              lastName: "Doe",
              workPlace: "corp",
              year: 2554,
              remarks: "จบแล้ว",
            },
            {
              id: "2",
              studentId: "6307050001",
              firstName: "Alice",
              lastName: "Doe",
              workPlace: "jo",
              year: 2556,
              remarks: "ตาย",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default GraduationPage;
