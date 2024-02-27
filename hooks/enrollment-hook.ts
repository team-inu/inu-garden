import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { enrollmentService } from '@/services/enrollment-service';
import {
  CreateEnrollmentForm,
  CreateEnrollmentPayload,
} from '@/types/schema/enrollment-schema';

export const useGetEnrollmentList = () =>
  useQuery({
    queryKey: ['enrollments'],
    queryFn: () => enrollmentService.getEnrollmentList(),
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
