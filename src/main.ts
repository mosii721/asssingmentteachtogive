import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService =app.get(ConfigService);
  const PORT=configService.getOrThrow<number>('PORT')
  await app.listen(PORT,() =>{
    console.log(`server is  running on http://localhost:${PORT}`);
  });
}
bootstrap();
