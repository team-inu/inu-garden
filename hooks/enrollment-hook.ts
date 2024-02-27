import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { enrollmentService } from '@/services/enrollment-service';
import {
  CreateEnrollmentForm,
  CreateEnrollmentPayload,
  EditEnrollmentForm,
} from '@/types/schema/enrollment-schema';

export const useGetEnrollmentsByCourseId = (courseId: string) =>
  useQuery({
    queryKey: ['enrollments'],
    queryFn: () => enrollmentService.getEnrollmentsByCourseId(courseId),
  });

export const useCreateEnrollment = () => {
  return useMutation({
    mutationFn: (enrollment: CreateEnrollmentPayload | CreateEnrollmentForm) =>
      enrollmentService.createEnrollment(enrollment),
    onSuccess: () => {
      toast.success('Enrollment has been created', {
        description: 'You can now add questions to the enrollment.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create enrollment', {
        description: error.message,
      });
    },
  });
};

export const useUpdateEnrollment = () => {
  return useMutation({
    mutationFn: (enrollment: EditEnrollmentForm) =>
      enrollmentService.editEnrollment(enrollment),
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
