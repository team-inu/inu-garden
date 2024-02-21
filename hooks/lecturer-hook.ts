import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { lecturerService } from '@/services/lecturer-service';
import { CreateLecturerType } from '@/types/schema/lecturer-schema';

export const useGetLecturerList = () =>
  useQuery({
    queryKey: ['students'],
    queryFn: () => lecturerService.getLecturerList(),
  });

export const useCreateLecturer = () => {
  return useMutation({
    mutationFn: (lecturer: CreateLecturerType) =>
      lecturerService.createLecturer(lecturer),
    onSuccess: () => {
      toast.success('Student has been created', {
        description: 'You can now add questions to the student.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create student', {
        description: error.message,
      });
    },
  });
};
