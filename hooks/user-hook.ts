import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { userService } from '@/services/user-service';
import { ChangePasswordForm, CreateManyUserForm, CreateUserForm, EditUserForm } from '@/types/schema/user-schema';

export const useGetUserList = () =>
  useQuery({
    queryKey: ['lecturers'],
    queryFn: () => userService.getUserList(),
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: CreateUserForm) => userService.createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lecturers'],
      });
      toast.success('User has been created', {
        description: 'You can now assign courses to this user.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create user', {
        description: error.message,
      });
    },
  });
};

export const useCreateManyUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (users: CreateManyUserForm) => userService.createManyUser(users),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      toast.success('Users have been created', {
        description: 'You can now assign courses to these users.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create users', {
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
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      toast.success('User has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update user');
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ChangePasswordForm) => userService.changePasswordUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      toast.success('User has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update user');
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lecturers'] });
      toast.success('User has been deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete user', {
        description: error.message,
      });
    },
  });
};
