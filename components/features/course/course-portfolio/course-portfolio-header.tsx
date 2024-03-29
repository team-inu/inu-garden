import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb';

const CoursePortfolioHeader = () => {
  return (
    <div className="pt-6">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href={'/course/1'}>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Course-Portfolio</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default CoursePortfolioHeader;
