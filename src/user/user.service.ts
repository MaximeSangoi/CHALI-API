import { Component, Inject } from '@nestjs/common';
import { User } from './user.model';
// import * as bcrypt from 'bcrypt';

@Component()
export class UserService {
    private saltRounds = 10;

    constructor() {}

    async getUsers(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            resolve([new User()]);
        });
        // return await this.userRepository.find();
    }

    async getUserByUsername(username: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const userToReturn = new User();
            userToReturn.email = 'coucou@yopmail.com';
            userToReturn.id = 3;
            userToReturn.username = 'Wepa';
            resolve(userToReturn);
        });
        // return (await this.userRepository.find({ username }))[0];
    }

    async createUser(user: User): Promise<User> {
        // user.passwordHash = await this.getHash(user.password);
        return new Promise<User>((resolve, reject) => {
            const userToReturn = new User();
            userToReturn.email = 'coucou@yopmail.com';
            userToReturn.id = 3;
            userToReturn.username = 'Wepa';
            resolve(userToReturn);
        });

        // clear password as we don't persist passwords
        // user.password = undefined;
        // return this.userRepository.save(user);
    }

    async getHash(password: string|undefined): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve('coucou');
        });
        // return bcrypt.hash(password, this.saltRounds);
    }

    async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
        // return bcrypt.compare(password, hash);
    }
}