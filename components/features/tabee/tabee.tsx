"use client";
import { useState } from "react";
import { ProgramLearningOutcomeDataTable } from "./plo/plo-table";
import { ProgramOutcomeDataTable } from "./po/po-table";
import { SubProgramLearningOutcomeDataTable } from "./sub-plo/sub-plo-table";
import { columns as ploColumns } from "./plo/plo-column";
import { columns as poColumns } from "./po/po-column";
import { columns as subPloColumns } from "./sub-plo/sub-plo-column";
import { PO, PLO, SubPLO } from "@/data/schema";

const mockPO: PO[] = [
  {
    id: "01HG65WNM1S9FSG1710P9E25BM",
    name: "PO1",
    description: "PO1 description",
  },
  {
    id: "01HG65WNM2SFQ2EB05BQQCJN0A",
    name: "PO2",
    description: "PO2 description",
  },
  {
    id: "01HG65WNM21C1YQMMEY5DAVKG7",
    name: "PO3",
    description: "PO3 description",
  },
];
const mockPLO: PLO[] = [
  {
    id: "01HG65WNM26ZY60SC0CYC4V4TK",
    name: "PLO1",
    description: "PLO1 description",
  },
  {
    id: "01HG65WNM2H6NET91P8N61MQ8Z",
    name: "PLO2",
    description: "PLO2 description",
  },
  {
    id: "01HG65WNM2A6PP0PY1EV3CWST1",
    name: "PLO3",
    description: "PLO3 description",
  },
];
const mockSubPLO: SubPLO[] = [
  {
    id: "01HG65WNM2DZATRKR411FN3MXW",
    descriptionThai: "Sub PLO1 description",
    descriptionEnglish: "Sub PLO1 description",
  },
  {
    id: "01HG65WNM2FNF5AEKKHBSV7WV7",
    descriptionThai: "Sub PLO1 description",
    descriptionEnglish: "Sub PLO1 description",
  },
  {
    id: "01HG65WNM275BMAJSTWJEN2TPP",
    descriptionThai: "Sub PLO1 description",
    descriptionEnglish: "Sub PLO1 description",
  },
];

const TABEE = () => {
  const [selectedRows, setSelectedRows] = useState<string>("");
  const getVales = (id: string) => {
    setSelectedRows(id);
  };
  return (
    <div className="">
      <div className="grid grid-row-2 gap-3 ">
        <div>
          <h1 className="text-2xl font-bold mb-5">Program Outcome</h1>
          <ProgramOutcomeDataTable columns={poColumns} data={mockPO} />
        </div>
        <div className="border my-2"></div>
        <div className="">
          <h1 className="text-2xl font-bold mb-5 ">Program Learning Outcome</h1>
          <ProgramLearningOutcomeDataTable
            columns={ploColumns}
            data={mockPLO}
            getValues={getVales}
          />
        </div>
      </div>
      <div>
        {selectedRows && (
          <div>
            <h1 className="text-2xl font-bold mb-5 ">Sub program learning outcome of {selectedRows}</h1>
            <SubProgramLearningOutcomeDataTable
              columns={subPloColumns}
              data={mockSubPLO}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TABEE;
