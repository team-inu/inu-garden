'use client';

import { columns } from '@/components/features/lecturer/lecturer-column';
import { LecturerDataTable } from '@/components/features/lecturer/lecturer-table';

const LecturerPage = () => {
  return (
    <div className="mx-auto w-10/12 py-8">
      <div>
        <h1 className="mb-5 text-4xl font-bold">Lecturer</h1>
      </div>
      <div className="">
        <LecturerDataTable
          columns={columns}
          data={[
            {
              id: '01HG3KK7WHC0XVKXTEV1ABXSZF',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@mail.kmutt.ac.th',
            },
            {
              id: '01HG3KK7WHBPW2DSDGTNHZ4QF2',
              firstName: 'Francesco',
              lastName: 'Newton',
              email: 'francesco.newton@mail.kmutt.ac.th',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default LecturerPage;
