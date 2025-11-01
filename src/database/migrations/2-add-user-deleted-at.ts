// src/database/migrations/1720000000000-add-user-deleted-at.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserDeletedAt2 implements MigrationInterface {
  name = 'AddUserDeletedAt1720000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "deleted_at" TIMESTAMP NULL`,
    );
    // (Opcional) Si quieres ON DELETE CASCADE en rentals.user_id:
    // await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "fk_rentals_user"`);
    // await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "fk_rentals_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // (Opcional) revertir CASCADE
    // await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "fk_rentals_user"`);
    // (re-crear sin CASCADE si aplica)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
  }
}
