import { FilePlusIcon } from '@radix-ui/react-icons';

import TABEE from '@/components/features/tabee/tabee';
import { Button } from '@/components/ui/button';
import { FolderDotIcon } from 'lucide-react';

const TABEEPage = () => {
  return (
    <div className="mx-auto w-10/12 py-8">
      <div className="mx-auto flex w-full items-center justify-between space-x-3">
        <h1 className="mb-5 text-4xl font-bold">TABEE Management</h1>
        <div className="">
          <div className="w-1/10 flex flex-row space-x-2">
            <Button
              className="ml-auto hidden h-10 lg:flex"
              variant="outline"
              size="sm"
            >
              <a className="flex items-center" href="/template/plo-po.xlsx">
                <FolderDotIcon className="mr-2 h-4 w-4" />
                Template
              </a>
            </Button>
            <Button variant={'default'} className="text-base font-bold">
              <FilePlusIcon className="mr-2 h-4 w-4" />
              Import File
            </Button>
          </div>
        </div>
      </div>
      <div className="">
        <TABEE />
      </div>
    </div>
  );
};

export default TABEEPage;
