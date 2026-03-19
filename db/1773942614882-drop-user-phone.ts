import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUserPhone1773942614882 implements MigrationInterface {
    name = 'DropUserPhone1773942614882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
