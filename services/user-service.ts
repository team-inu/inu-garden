import { ApiService } from '@/services/api-service';
import {
  ChangePasswordForm,
  CreateManyUserForm,
  CreateUserForm,
  EditUserForm,
  GetUserResponse,
} from '@/types/schema/user-schema';

class UserService extends ApiService {
  public async getUserList(): Promise<GetUserResponse[]> {
    const url = '/users';
    return this.get(url)
      .then((response) => {
        return response.data.data as unknown as GetUserResponse[];
      })
      .catch(this.throwError);
  }

  public async createUser(user: CreateUserForm): Promise<CreateUserForm> {
    const url = `/users`;

    return this.post(url, user)
      .then(() => user)
      .catch(this.throwError);
  }

  public async createManyUser(users: CreateManyUserForm): Promise<CreateManyUserForm> {
    const url = '/users/bulk';

    return this.post(url, users)
      .then(() => users)
      .catch(this.throwError);
  }

  public async updateUser(userId: string, user: EditUserForm): Promise<EditUserForm> {
    const url = `/users/${userId}`;

    return this.patch(url, user)
      .then(() => user)
      .catch(this.throwError);
  }

  public async deleteUser(id: string) {
    const url = `/users/${id}`;
    return this.delete(url)
      .then(() => {})
      .catch(this.throwError);
  }

  public async changePasswordUser(data: ChangePasswordForm): Promise<void> {
    const url = `/users/${data.userId}/password`;
    return this.post(url, data)
      .then(() => {})
      .catch(this.throwError);
  }
}

export const userService = new UserService();
