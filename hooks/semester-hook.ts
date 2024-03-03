import { useQuery } from '@tanstack/react-query';

import { semesterService } from '@/services/semester-service';

export const useGetSemesterList = () =>
  useQuery({
    queryKey: ['semesters'],
    queryFn: () => semesterService.getSemesterList(),
  });
