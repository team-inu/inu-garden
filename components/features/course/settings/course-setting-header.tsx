import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb';

const CourseSettingHeader = () => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href={'http://localhost:3000/course/1'}>
          Dashboard
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>Settings</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default CourseSettingHeader;
