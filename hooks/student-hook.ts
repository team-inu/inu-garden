import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { studentService } from '@/services/student-service';
import {
  CreateStudentForm,
  UpdateStudentForm,
} from '@/types/schema/student-schema';

export const useGetStudentList = () =>
  useQuery({
    queryKey: ['students'],
    queryFn: () => studentService.getStudentList(),
  });

export const useCreateStudent = () => {
  return useMutation({
    mutationFn: (student: CreateStudentForm) =>
      studentService.createStudent(student),
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

export const useCreateStudentBulk = () => {
  return useMutation({
    mutationFn: (students: CreateStudentForm[]) =>
      studentService.createStudentBulk(students),
    onSuccess: () => {
      toast.success('Students have been created', {
        description: 'You can now see the students in the list.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create students', {
        description: error.message,
      });
    },
  });
};

export const useUpdateStudent = () => {
  return useMutation({
    mutationFn: (student: UpdateStudentForm) =>
      studentService.updateStudent(student.kmuttId, student),
    onSuccess: () => {
      toast.success('Enrollment status has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update enrollment', {
        description: error.message,
      });
    },
  });
};
