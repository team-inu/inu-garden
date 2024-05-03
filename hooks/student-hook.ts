import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useGetStudentWithOutcomes = (studentId: string) =>
  useQuery({
    queryKey: ['outcomes-student'],
    queryFn: () => studentService.getStudentWithOutcomes(studentId),
  });

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (student: CreateStudentForm) =>
      studentService.createStudent(student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student has been created', {
        description: 'You can now enroll this student.',
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (students: CreateStudentForm[]) =>
      studentService.createStudentBulk(students),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Students have been created', {
        description: 'You can now see the students in the table.',
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (student: UpdateStudentForm) =>
      studentService.updateStudent(student.kmuttId, student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update enrollment', {
        description: error.message,
      });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => studentService.deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student has been deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete student', {
        description: error.message,
      });
    },
  });
};
