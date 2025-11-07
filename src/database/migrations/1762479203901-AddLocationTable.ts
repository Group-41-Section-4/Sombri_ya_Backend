import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLocationTable1762479203901 implements MigrationInterface {
  name = 'AddLocationTable1762479203901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "latitude" numeric(10,6) NOT NULL, "longitude" numeric(10,6) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ADD CONSTRAINT "FK_78eda52dc27b7ad20350c4a752d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "locations" DROP CONSTRAINT "FK_78eda52dc27b7ad20350c4a752d"`,
    );
    await queryRunner.query(`DROP TABLE "locations"`);
  }
}
