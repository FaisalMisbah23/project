import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneMigrations1773943128486 implements MigrationInterface {
    name = 'AddPhoneMigrations1773943128486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
