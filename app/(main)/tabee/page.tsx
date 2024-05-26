'use client';

import { withAuth } from '@/components/features/routes/private-route';
import TABEE from '@/components/features/tabee/tabee';
import { Role } from '@/types/auth-type';

const TABEEPage = () => {
  return (
    <div className="mx-auto w-10/12 py-8">
      <div className="mx-auto flex w-full items-center justify-between space-x-3">
        <h1 className="mb-5 text-4xl font-bold">TABEE Management</h1>
      </div>
      <div className="">
        <TABEE />
      </div>
    </div>
  );
};

export default withAuth(TABEEPage, [Role.HEAD_OF_CURRICULUM, Role.TABEE_MANAGER]);
