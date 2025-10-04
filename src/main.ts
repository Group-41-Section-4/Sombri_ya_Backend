import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  initializeTransactionalContext,
  addTransactionalDataSource,
} from 'typeorm-transactional';
import { DataSource } from 'typeorm';

async function bootstrap() {
  // Inicializar el contexto transaccional
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, { cors: true });

  // Registrar el DataSource con el sistema transaccional
  const dataSource = app.get(DataSource);
  addTransactionalDataSource(dataSource);

  const config = new DocumentBuilder()
    .setTitle('Sombrí-Ya API')
    .setDescription('The Sombrí-Ya umbrella rental application API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Validación global
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
