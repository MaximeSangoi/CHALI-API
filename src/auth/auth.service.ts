import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async createToken(id: number, username: string) {
        const expiresIn = 60 * 60;
        const secretOrKey = 'secret';
        const user = { username };
        const token = jwt.sign(user, secretOrKey, { expiresIn });
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    async validateUser(signedUser): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (signedUser && signedUser.username) {
                resolve(Boolean(this.userService.getUserByUsername(signedUser.username)));
            }
            resolve(true);
        });
    }
}