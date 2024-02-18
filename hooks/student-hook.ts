import { useQuery } from '@tanstack/react-query';

import { studentService } from '@/services/student-service';

export const useGetStudentList = () =>
  useQuery({
    queryKey: ['students'],
    queryFn: () => studentService.getStudentList(),
  });
