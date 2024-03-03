import { useQuery } from '@tanstack/react-query';

import { programmeService } from '@/services/programme-service';

export const useGetProgrammeList = () =>
  useQuery({
    queryKey: ['programmes'],
    queryFn: () => programmeService.getProgrammeList(),
  });
