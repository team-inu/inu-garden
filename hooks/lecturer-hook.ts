import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { lecturerService } from '@/services/lecturer-service';
import {
  CreateLecturerType,
  CreateManyLecturerType,
  EditLecturerType,
} from '@/types/schema/lecturer-schema';

export const useGetLecturerList = () =>
  useQuery({
    queryKey: ['lectuers'],
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

export const useCreateManyLecturers = () => {
  return useMutation({
    mutationFn: (lecturers: CreateManyLecturerType) =>
      lecturerService.createManyLecturer(lecturers),
    onSuccess: () => {
      toast.success('Students has been created', {
        description: 'You can now add questions to the students.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create students', {
        description: error.message,
      });
    },
  });
};

export const useUpdateLecturer = () => {
  return useMutation({
    mutationFn: ({
      lecturer,
      lecturerId,
    }: {
      lecturer: EditLecturerType;
      lecturerId: string;
    }) => lecturerService.updateLecturer(lecturer, lecturerId),
    onSuccess: () => {
      toast.success('Student has been updated', {
        description: 'You can now add questions to the student.',
      });
    },
    onError: (error) => {
      toast.error('Failed to update student', {
        description: error.message,
      });
    },
  });
};
