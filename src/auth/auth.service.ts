import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, passwordInput: string): Promise<any> {
    const user = await this.usersService.getByUsername(username);
    if (user) {
      const isPasswordRight = await this.usersService.compareHash(
        passwordInput,
        user.password,
      );
      if (isPasswordRight) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.firstname };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
