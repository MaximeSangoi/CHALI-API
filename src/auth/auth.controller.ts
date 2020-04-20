import {
  Controller,
  Post,
  HttpStatus,
  UseGuards,
  Response,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import { LocalAuthGuard } from './local.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Response() res: any, @Body() body: User) {
    if (!(body && body.username && body.password)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Username and password are required!' });
    } else {
      return res
        .status(HttpStatus.OK)
        .json(await this.authService.login(body.username));
    }
  }

  @Post('register')
  async registerUser(@Response() res: any, @Body() body: User) {
    if (!(body && body.username && body.password)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Username and password are required!' });
    }

    let user = await this.userService.getById(body.username);
    if (user) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Username exists' });
    } else {
      user = await this.userService.create(body);
    }

    return res.status(HttpStatus.OK).json(user);
  }
}
