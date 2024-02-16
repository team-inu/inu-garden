'use client';

import { columns } from '@/components/features/graduation/graduation-column';
import { GraduationDataTable } from '@/components/features/graduation/graduation-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GraduationPage = () => {
  return (
    <div className="mx-auto w-10/12 py-8">
      <div className="mx-auto flex w-full items-center justify-between space-x-3">
        <h1 className="mb-5 text-4xl font-bold">Graduation</h1>
        <div className="w-1/12">
          <Button>Add Form</Button>
        </div>
      </div>
      <div className="">
        <GraduationDataTable
          columns={columns}
          data={[
            {
              id: '1',
              studentId: '6307050000',
              firstName: 'กกก',
              lastName: 'Doe',
              workPlace: 'corp',
              year: 2554,
              remarks: 'จบแล้ว',
            },
            {
              id: '2',
              studentId: '6307050001',
              firstName: 'Alice',
              lastName: 'Doe',
              workPlace: 'jo',
              year: 2556,
              remarks: 'ตาย',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default GraduationPage;
