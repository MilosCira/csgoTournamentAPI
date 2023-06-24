import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('CSGO TOURNAMENT API')
    .setDescription('CSGO TOURNAMENT API description')
    .setVersion('1.0')
    .addTag('csgo')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
