import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { User } from './user.interface';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() user: User) {
    this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  getById(@Param('userId') userId: string) {
    return this.userService.getByUsername(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/edit/:userID')
  update(
    @Param('userID') userID: string,
    @Body() newUser: User,
  ): Promise<User> {
    return this.userService.update(userID, newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/remove/:userID')
  remove(@Param('userID') userID: string): Promise<User> {
    return this.userService.remove(userID);
  }
}
