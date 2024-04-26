import { useParams } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb';

const CoursePortfolioHeader = () => {
  const { id: courseId } = useParams<{ id: string }>();
  return (
    <div className="pt-6">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href={'/course/' + courseId}>
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Course-Portfolio</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default CoursePortfolioHeader;
