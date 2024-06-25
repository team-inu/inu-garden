import { ApiService } from '@/services/api-service';
import { User } from '@/types/auth-type';

class AuthService extends ApiService {
  public async me(): Promise<User> {
    return this.get('/auth/me')
      .then((response) => {
        return response.data.data as unknown as User;
      })
      .catch(this.throwError);
  }

  public async signIn(email: string, password: string, cfToken: string): Promise<void> {
    return this.post('/auth/login', { email, password }, { headers: { 'Cf-Token': cfToken } })
      .then(() => {})
      .catch(this.throwError);
  }

  // public async changePassword(
  //   oldPassword: string,
  //   newPassword: string
  // ): Promise<void> {
  //   return this.patch("/users/password", { oldPassword, newPassword })
  //     .then(() => {})
  //     .catch(this.throwError);
  // }

  public async signOut(): Promise<void> {
    return this.get('/auth/logout')
      .then(() => {})
      .catch(this.throwError);
  }
}

export const authService = new AuthService();
