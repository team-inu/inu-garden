'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { columns } from '@/components/features/graduation/graduation-column';
import { GraduationDataTable } from '@/components/features/graduation/graduation-table';
import { withAuth } from '@/components/features/routes/private-route';
import { Button } from '@/components/ui/button';
import { Role } from '@/types/auth-type';
import { GraduationColumn } from '@/types/schema/graduation-schema';

const GraduationPage = () => {
  const [graduation, setGraduation] = useState<GraduationColumn[]>([]);

  const handleUploadUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return toast.error('Can not read file');
    }

    const rawTxt = await file.text();

    const lines = rawTxt.split('\n').slice(1);

    const graduation: GraduationColumn[] = lines.map((e) => {
      const column = e.replaceAll('"', '').split(',');
      return {
        firstName: column[1],
        lastName: column[2],
        studentId: column[3],
        year: column[4],
        workPlace: column[5],
        remarks: column[6],
        id: String(Math.random()),
      };
    });

    console.log(graduation);

    setGraduation(graduation);

    lines.map((e) => {});

    toast.success('graduation imported successfully');
  };

  return (
    <div className="mx-auto w-10/12 py-8">
      <div className="mx-auto flex w-full items-center justify-between space-x-3">
        <h1 className="mb-5 text-4xl font-bold">Graduation</h1>
        <div className="w-1/12">
          <Button>Add Form</Button>
        </div>
      </div>
      <div className="">
        <GraduationDataTable columns={columns} data={graduation} handleUpload={handleUploadUser} />
      </div>
    </div>
  );
};

export default withAuth(GraduationPage, [Role.HEAD_OF_CURRICULUM, Role.MODERATOR, Role.TABEE_MANAGER]);
