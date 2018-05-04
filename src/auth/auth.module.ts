import * as passport from 'passport';
import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
    imports: [UserModule],
    components: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(passport.authenticate('jwt', { session: false }))
        .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}