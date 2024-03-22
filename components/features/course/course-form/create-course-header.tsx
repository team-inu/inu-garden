import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb';

const CreateCourseHeader = () => {
  return (
    <div className="pt-6">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href={'/course'}>Courses</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Create course</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default CreateCourseHeader;
