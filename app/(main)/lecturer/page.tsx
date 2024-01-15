"use client";

import { LecturerDataTable } from "@/components/features/lecturer/lecturer-table";
import { columns } from "@/components/features/lecturer/lecturer-column";

const LecturerPage = () => {
  return (
    <div className="w-10/12 mx-auto py-8">
       <div>
        <h1 className="text-4xl font-bold mb-5">Lecturer</h1>
      </div>
      <div className="">
        <LecturerDataTable columns={columns} data={[{
              id: "01HG3KK7WHC0XVKXTEV1ABXSZF",
              name: "Smith",
              firstName: "John",
              lastName: "Doe",
              email: "john.doe@mail.kmutt.ac.th"
            },
            {
              id: "01HG3KK7WHBPW2DSDGTNHZ4QF2",
              name: "Ton",
              firstName: "Francesco",
              lastName: "Newton",
              email: "francesco.newton@mail.kmutt.ac.th"
            },
          ]} />

        
      </div>
    </div>
  );
};

export default LecturerPage;
