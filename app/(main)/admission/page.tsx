"use client";

import { AdmissionDataTable } from "@/components/features/admission/admission-table";
import { columns } from "@/components/features/admission/addmisson-column";

const AdmissionPage = () => {
  return (
    <div className="w-10/12 mx-auto py-8">
       <div>
        <h1 className="text-4xl font-bold mb-5">Admission</h1>
      </div>
      <div className="">
        <AdmissionDataTable columns={columns} data={[{
          id: "1",
          studentId: "6307050000",
          firstName: "กกก",
          lastName: "Doe",
          admission: "โครงการ 2B",
          email: "Johnxx@mail.com",
          GPAX: 3.5,
          mathGPA: 3.5,
          englishGPA: 3.5,
          scienceGPA: 3.5,
          school: "Chiang Mai School",
          city: "Chiang Mai",
        },
        {  id: "2",
          studentId: "6307050001",
          firstName: "Alice",
          lastName: "Doe",
          admission: "โครงการ 3B",
          email: "Aliceme@mail.com",
          GPAX: 3.5,
          mathGPA: 3.5,
          englishGPA: 3.5,
          scienceGPA: 3.5,
          school: "Bangkok School",
          city: "Bangkok",
        },
        ]} />
      </div>
    </div>
  );
};

export default AdmissionPage;
