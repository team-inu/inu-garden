import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { lecturerService } from '@/services/lecturer-service';
import {
  CreateLecturerForm,
  CreateManyLecturerForm,
  EditLecturerForm,
} from '@/types/schema/lecturer-schema';

export const useGetLecturerList = () =>
  useQuery({
    queryKey: ['lectuers'],
    queryFn: () => lecturerService.getLecturerList(),
  });

export const useCreateLecturer = () => {
  return useMutation({
    mutationFn: (lecturer: CreateLecturerForm) =>
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
    mutationFn: (lecturers: CreateManyLecturerForm) =>
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
    mutationFn: (lecturer: EditLecturerForm) =>
      lecturerService.updateLecturer(lecturer.id, lecturer),
    onSuccess: () => {
      toast.success('Lecturers has been created', {
        description: 'You can now add questions to the lecturers.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create lecturers', {
        description: error.message,
      });
    },
  });
};
