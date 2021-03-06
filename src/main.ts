import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);
}

process.on('unhandledRejection', (reason, p) => {
  // application specific logging, throwing an error, or other logic here
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

bootstrap();
