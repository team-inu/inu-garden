'use client';

import { columns } from './student-column';
import { StudentDataTable } from './student-table';

const Student = () => {
  return (
    <>
      <h1 className="mb-5 text-2xl font-bold">Students</h1>{' '}
      <StudentDataTable
        columns={columns}
        data={[
          {
            id: '1',
            firstName: 'John',
            lastName: 'eiei',
            email: 'a',
            name: 'a',
            label: 'passed',
          },
          {
            id: '2',
            firstName: 'Por',
            lastName: 'Doe',
            email: 'a',
            name: 'a',
            label: 'passed',
          },
          {
            id: '3',
            firstName: 'Annt',
            lastName: 'Doe',
            email: 'a',
            name: 'a',
            label: 'failed',
          },
        ]}
      />
    </>
  );
};

export default Student;
