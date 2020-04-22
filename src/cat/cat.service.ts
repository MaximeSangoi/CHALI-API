import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatService {
  private saltRounds = 10;
  private readonly cats: Cat[];

  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  async create(createCat: Cat): Promise<Cat> {
    const createdcat = new this.catModel(createCat);
    return await createdcat.save();
  }

  async getAll(query: object): Promise<Cat[]> {
    return await this.catModel.find(query).exec();
  }

  async getBy(query: object): Promise<Cat> {
    return this.catModel.findOne(query);
  }

  async getById(catId: string): Promise<Cat> {
    return await this.catModel.findById(catId).exec();
  }

  async update(catId: string, newCat: Cat): Promise<Cat> {
    return await this.catModel.findByIdAndUpdate(catId, newCat).exec();
  }

  async remove(catId: string): Promise<Cat> {
    return await this.catModel.findByIdAndRemove(catId).exec();
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
