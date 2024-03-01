'use client';

import Loading from '@/components/features/loading-screen';
import { columns } from '@/components/features/user/user-column';
import { UserDataTable } from '@/components/features/user/user-table';
import { useGetUserList } from '@/hooks/user-hook';

const UserPage = () => {
  const { data: users, isLoading } = useGetUserList();

  return (
    <div className="mx-auto w-10/12 py-8">
      <div>
        <h1 className="mb-5 text-4xl font-bold">User</h1>
      </div>
      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <UserDataTable
            columns={columns}
            data={
              users?.map((user) => ({
                ...user,
                collapsibleContent: 'test',
              })) ?? []
            }
          />
        )}
      </div>
    </div>
  );
};

export default UserPage;
