import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { InitialSeed } from './initial-seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(InitialSeed);

  try {
    console.log('Seeding database...');
    await seeder.run();
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding failed!', error);
  } finally {
    await app.close();
  }
}

bootstrap();
