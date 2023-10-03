import { Button } from "@/components/ui/button";
import SelectForm from "./selection-form";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import AssessmentSection from "./assessment-section";
import { useMemo } from "react";

type LinkedSectionProps = {
  index: number;
  form: UseFormReturn<any>;
};

const LinkedSection: React.FC<LinkedSectionProps> = ({
  index: resultIndex,
  form,
}) => {
  const { control } = form;
  const {
    fields: cloFields,
    append: appendClo,
    remove: removeClo,
  } = useFieldArray({
    control,
    name: `resultForm[${resultIndex}].clo`,
  });

  return (
    <div className="flex flex-col space-y-5">
      <SelectForm
        name={`resultForm[${resultIndex}].po`}
        lable="PO"
        placeholder={"Please select PO"}
        form={form}
        options={[
          {
            value: "po1",
            text: "po1",
          },
          {
            value: "po2",
            text: "po2",
          },
        ]}
      />
      <SelectForm
        name={`resultForm[${resultIndex}].plo`}
        lable="PLO"
        placeholder="Please select PLO"
        form={form}
        options={[
          {
            value: "plo1",
            text: "plo1",
          },
          {
            value: "plo2",
            text: "plo2",
          },
        ]}
      />
      <Button
        type="button"
        className="w-full"
        onClick={() => {
          appendClo({});
        }}
      >
        เพิ่ม CLO
      </Button>
      <div className="space-y-5">
        {cloFields.map((item, index) => {
          return (
            <div key={item.id} className="flex flex-col border-2 p-3 space-y-5">
              <div className="w-full flex justify-between items-center ">
                <div className="self-start border-2 rounded-full p-1 px-3 dark:border-white">
                  {resultIndex + 1}.{index + 1}
                </div>
                <Button
                  className="self-end"
                  type="button"
                  onClick={() => {
                    removeClo(index);
                  }}
                >
                  -
                </Button>
              </div>
              <SelectForm
                name={`resultForm[${resultIndex}].clo[${index}].description`}
                lable="CLO"
                placeholder="Please select CLO"
                form={form}
                options={[
                  {
                    value: "clo1",
                    text: "clo1",
                  },
                  {
                    value: "clo2",
                    text: "clo2",
                  },
                ]}
              />
              <AssessmentSection
                form={form}
                resultIndex={resultIndex}
                cloIndex={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LinkedSection;
