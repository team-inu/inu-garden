import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { importerService } from '@/services/importer-service';
import { ImportCourse } from '@/types/schema/importer-schema';

export const useImportCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (course: ImportCourse) => importerService.importCourse(course),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['coursess'],
      });
      toast.success('Course has been imported', {
        description: 'everything except the basic course info (ex: code, name) has been import',
      });
    },
    onError: (error) => {
      toast.error('Failed to create course', {
        description: error.message,
      });
    },
  });
};
