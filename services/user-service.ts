import { ApiService } from '@/services/api-service';
import {
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

  public async createUser(user: CreateUserForm): Promise<void> {
    const url = `/users`;

    this.post(url, user)
      .then(() => user)
      .catch(this.throwError);
  }

  public async createManyUser(
    users: CreateManyUserForm,
  ): Promise<CreateManyUserForm> {
    const url = '/users/bulk';

    console.log(users);
    return this.post(url, users)
      .then(() => users)
      .catch(this.throwError);
  }

  public async updateUser(userId: string, user: EditUserForm): Promise<void> {
    const url = `/users/${userId}`;

    this.patch(url, user)
      .then(() => user)
      .catch(this.throwError);
  }

  public async deleteUser(id: string) {
    const url = `/users/${id}`;
    return this.delete(url)
      .then(() => {})
      .catch(this.throwError);
  }
}

export const userService = new UserService();
