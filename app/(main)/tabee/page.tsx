import TABEE from "@/components/features/tabee/tabee";
import { Button } from "@/components/ui/button";
import { FilePlusIcon } from "@radix-ui/react-icons";


const TABEEPage = () => {
  return (
    <div className="w-10/12 mx-auto py-8">
      <div className="flex items-center justify-between w-full space-x-3 mx-auto">
        <h1 className="text-4xl font-bold mb-5">TABEE Management</h1>
        <div className="w-1/12">
          <Button variant={"default"} className="text-base font-bold">
            <FilePlusIcon className="h-4 w-4 mr-2" />
            Import File
          </Button>
        </div>
      </div>
      <div className="">
        <TABEE/>
      </div>
    </div>
  );
};

export default TABEEPage;
