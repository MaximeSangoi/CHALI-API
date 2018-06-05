import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async createToken(username: string) {
        const expiresIn = 60 * 60;
        const privateKey = 'NhuPhlw7jARCjxQEBh4EbSOc40D2AEGD08kVI4gBKmyhG0MZ9hKJEJ71KXPBltv';
        const user = { username };
        const token = jwt.sign(user, privateKey, { expiresIn });
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    async validateUser(signedUser): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (signedUser && signedUser.username) {
                resolve(Boolean(this.userService.getById(signedUser.id)));
            }
            resolve(true);
        });
    }
}