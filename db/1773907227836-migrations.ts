import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1773907227836 implements MigrationInterface {
    name = 'Migrations1773907227836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "phone" character varying`);
        await queryRunner.query(`UPDATE "users" SET "phone" = CONCAT('unknown-', "id") WHERE "phone" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "phone"`);
    }

}
