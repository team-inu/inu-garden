import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { userService } from '@/services/user-service';
import {
  CreateManyUserForm,
  CreateUserForm,
  EditUserForm,
} from '@/types/schema/user-schema';

export const useGetUserList = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUserList(),
  });

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: CreateUserForm) => userService.createUser(user),
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

export const useCreateManyUsers = () => {
  return useMutation({
    mutationFn: (users: CreateManyUserForm) =>
      userService.createManyUser(users),
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

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (user: EditUserForm) => userService.updateUser(user.id, user),
    onSuccess: () => {
      toast.success('Users has been created', {
        description: 'You can now add questions to the users.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create users', {
        description: error.message,
      });
    },
  });
};
