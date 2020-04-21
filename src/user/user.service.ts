import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private saltRounds = 10;
  private readonly users: User[];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUser: User): Promise<User> {
    const createduser = new this.userModel(createUser);
    return await createduser.save();
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username });
  }

  async getById(userId: string): Promise<User> {
    return await this.userModel.findById(userId).exec();
  }

  async update(userId: string, newUser: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userId, newUser).exec();
  }

  async remove(userId: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(userId).exec();
  }

  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
