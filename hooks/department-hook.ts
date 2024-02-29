import { useQuery } from '@tanstack/react-query';

import { departmentService } from '@/services/department-service';

export const useGetDepartments = () =>
  useQuery({
    queryKey: ['department'],
    queryFn: () => departmentService.getDepartments(),
  });
