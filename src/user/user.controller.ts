import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

    @Post()
    create(@Body() user: User) {
      this.userService.create(user);
    }

    @Get()
    getAll(): Promise<User[]> {
      return this.userService.getAll();
    }
    
    @Get("/:userId")
    getById(@Param("userId") userId: string) {
      return this.userService.getById(userId);
    }
    
    @Post("/edit/:userID")
    update(@Param("userID") userID: string, @Body() newUser: User ): Promise<User> {
      return this.userService.update(userID, newUser);
    }

    @Post("/remove/:userID")
    remove(@Param("userID") userID: string): Promise<User> {
      return this.userService.remove(userID);
    }
}