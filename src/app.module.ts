import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from 'auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017')
  ],
  controllers: [AppController],
})
export class AppModule {}
