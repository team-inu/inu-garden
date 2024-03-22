import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb';

type CourseSettingHeaderProps = {
  courseId: string;
};

const CourseSettingHeader: React.FC<CourseSettingHeaderProps> = ({
  courseId,
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href={`/course/${courseId}`}>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>Settings</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default CourseSettingHeader;
