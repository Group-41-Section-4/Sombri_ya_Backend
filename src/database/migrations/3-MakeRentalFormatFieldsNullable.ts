import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeRentalFormatFieldsNullable3 implements MigrationInterface {
  name = 'MakeRentalFormatFieldsNullable1732820000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "rental_formats"
      ALTER COLUMN "description" DROP NOT NULL,
      ALTER COLUMN "imageData" DROP NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "rental_formats"
      ALTER COLUMN "imageData" SET NOT NULL,
      ALTER COLUMN "description" SET NOT NULL
    `);
  }
}
