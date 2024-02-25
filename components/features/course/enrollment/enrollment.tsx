'use client';

import { columns } from '@/components/features/course/enrollment/enrollment-column';
import { EnrollmentDataTable } from '@/components/features/course/enrollment/enrollment-table';

const Enrollment = () => {
  return (
    <>
      <h1 className="mb-5 text-2xl font-bold">Enrollments</h1>{' '}
      <EnrollmentDataTable
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

export default Enrollment;
