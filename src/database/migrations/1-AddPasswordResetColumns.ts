import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordResetColumns1 implements MigrationInterface {
  name = 'AddPasswordResetColumns1';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Añade el hash del token de reset (texto)
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "passwordResetTokenHash" text NULL
    `);

    // Añade la expiración del token (timestamp con zona horaria)
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "passwordResetExpires" TIMESTAMP WITH TIME ZONE NULL
    `);

    // Añade la versión de contraseña (para invalidar sesiones antiguas)
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "passwordVersion" integer NOT NULL DEFAULT 0
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN IF EXISTS "passwordVersion"
    `);
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN IF EXISTS "passwordResetExpires"
    `);
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN IF EXISTS "passwordResetTokenHash"
    `);
  }
}
