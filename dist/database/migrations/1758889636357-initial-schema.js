"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1758889636357 = void 0;
class InitialSchema1758889636357 {
    name = 'InitialSchema1758889636357';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "plans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "duration_days" integer NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_3720521a81c7c24fe9b7202ba61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."subscriptions_status_enum" AS ENUM('active', 'expired', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "plan_id" uuid NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "status" "public"."subscriptions_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(255) NOT NULL, "place_name" character varying(255) NOT NULL, "latitude" numeric(10,6) NOT NULL, "longitude" numeric(10,6) NOT NULL, "location" geography(Point,4326), CONSTRAINT "PK_f047974bd453c85b08bab349367" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6f587631ae30395a1d50a0eb0f" ON "stations" USING GiST ("location") `);
        await queryRunner.query(`CREATE TYPE "public"."umbrellas_state_enum" AS ENUM('available', 'rented', 'maintenance')`);
        await queryRunner.query(`CREATE TABLE "umbrellas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "station_id" uuid NOT NULL, "state" "public"."umbrellas_state_enum" NOT NULL DEFAULT 'available', "last_maintenance_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6e5d868daa7ea94d5d2729fa136" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."payment_methods_type_enum" AS ENUM('card', 'nfc', 'qr', 'wallet')`);
        await queryRunner.query(`CREATE TABLE "payment_methods" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "type" "public"."payment_methods_type_enum" NOT NULL, "meta" jsonb NOT NULL, CONSTRAINT "PK_34f9b8c6dfb4ac3559f7e2820d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."rentals_status_enum" AS ENUM('ongoing', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TYPE "public"."rentals_auth_type_enum" AS ENUM('nfc', 'qr')`);
        await queryRunner.query(`CREATE TABLE "rentals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "umbrella_id" uuid NOT NULL, "station_start_id" uuid NOT NULL, "station_end_id" uuid, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "end_time" TIMESTAMP WITH TIME ZONE, "status" "public"."rentals_status_enum" NOT NULL DEFAULT 'ongoing', "duration_minutes" integer, "distance_meters" integer, "payment_method_id" uuid, "auth_type" "public"."rentals_auth_type_enum" NOT NULL, "auth_attempts" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feature_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "name" character varying(255) NOT NULL, "is_bug" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "details" jsonb, CONSTRAINT "PK_71d378bbbfaaeca7b56b1a3d55d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "biometric_enabled" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_open_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "location" geography(Point,4326) NOT NULL, CONSTRAINT "PK_4ba5f4e548250642be4c314b18a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd2097c8cc7be983ba002bb23e" ON "app_open_logs" USING GiST ("location") `);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_e45fca5d912c3a2fab512ac25dc" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "umbrellas" ADD CONSTRAINT "FK_c9488f482a35dacbd95711adb62" FOREIGN KEY ("station_id") REFERENCES "stations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ADD CONSTRAINT "FK_d7d7fb15569674aaadcfbc0428c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_b13ac8580bd6a011f47a476fbad" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_f6b146fee1b349d87da727b72ae" FOREIGN KEY ("umbrella_id") REFERENCES "umbrellas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_dc41bab8eec986f8db357cb09aa" FOREIGN KEY ("station_start_id") REFERENCES "stations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_a8f2435ec8bbbfc7edc4f91b2c2" FOREIGN KEY ("station_end_id") REFERENCES "stations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_73eac6759a5e969e2c2c89f5c7d" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feature_logs" ADD CONSTRAINT "FK_6e0a7dd8c12d2ebfe9f2938dbd7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "feature_logs" DROP CONSTRAINT "FK_6e0a7dd8c12d2ebfe9f2938dbd7"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_73eac6759a5e969e2c2c89f5c7d"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_a8f2435ec8bbbfc7edc4f91b2c2"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_dc41bab8eec986f8db357cb09aa"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_f6b146fee1b349d87da727b72ae"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_b13ac8580bd6a011f47a476fbad"`);
        await queryRunner.query(`ALTER TABLE "payment_methods" DROP CONSTRAINT "FK_d7d7fb15569674aaadcfbc0428c"`);
        await queryRunner.query(`ALTER TABLE "umbrellas" DROP CONSTRAINT "FK_c9488f482a35dacbd95711adb62"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_e45fca5d912c3a2fab512ac25dc"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd2097c8cc7be983ba002bb23e"`);
        await queryRunner.query(`DROP TABLE "app_open_logs"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "feature_logs"`);
        await queryRunner.query(`DROP TABLE "rentals"`);
        await queryRunner.query(`DROP TYPE "public"."rentals_auth_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."rentals_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment_methods"`);
        await queryRunner.query(`DROP TYPE "public"."payment_methods_type_enum"`);
        await queryRunner.query(`DROP TABLE "umbrellas"`);
        await queryRunner.query(`DROP TYPE "public"."umbrellas_state_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f587631ae30395a1d50a0eb0f"`);
        await queryRunner.query(`DROP TABLE "stations"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TYPE "public"."subscriptions_status_enum"`);
        await queryRunner.query(`DROP TABLE "plans"`);
    }
}
exports.InitialSchema1758889636357 = InitialSchema1758889636357;
//# sourceMappingURL=1758889636357-initial-schema.js.map