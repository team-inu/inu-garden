import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: CreateUserForm) => userService.createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (users: CreateManyUserForm) =>
      userService.createManyUser(users),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: EditUserForm) => userService.updateUser(user.id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
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

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User has been deleted', {
        description: 'You can now add questions to the user.',
      });
    },
    onError: (error) => {
      toast.error('Failed to delete user', {
        description: error.message,
      });
    },
  });
};
