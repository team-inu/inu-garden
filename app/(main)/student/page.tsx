'use client';

import { withAuth } from '@/components/features/routes/private-route';
import Student from '@/components/features/student/student';
import { Role } from '@/types/auth-type';

const AdmissionPage = () => {
  return (
    <div className="mx-auto w-10/12 py-8">
      <Student />
    </div>
  );
};

export default withAuth(AdmissionPage, [Role.HEAD_OF_CURRICULUM, Role.MODERATOR, Role.TABEE_MANAGER]);
