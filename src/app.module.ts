import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from 'auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'user/user.module';
import { CatModule } from 'cat/cat.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CatModule,
    MongooseModule.forRoot('mongodb://localhost:27017/leChatLibre', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
