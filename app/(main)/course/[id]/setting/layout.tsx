'use client';

import { useParams } from 'next/navigation';

import { SidebarNav } from '@/components/features/common/sidebar-nav';
import CourseSettingHeader from '@/components/features/course/settings/course-setting-header';
import { Separator } from '@/components/ui/separator';

const getSidebarNavItems = (courseId: string) => {
  return [
    {
      title: 'Course',
      href: `/course/${courseId}/setting`,
    },
    {
      title: 'Permission',
      href: `/course/${courseId}/setting/permission`,
    },
  ];
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const { id: courseId } = useParams<{ id: string }>();
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <CourseSettingHeader courseId={courseId} />
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={getSidebarNavItems(courseId)} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
