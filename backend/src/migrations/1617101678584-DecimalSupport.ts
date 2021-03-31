import { MigrationInterface, QueryRunner } from 'typeorm';

export class DecimalSupport1617101678584 implements MigrationInterface {
  name = 'DecimalSupport1617101678584';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oil" ALTER COLUMN "filled" TYPE NUMERIC`,
    );
    await queryRunner.query(
      `ALTER TABLE "power" ALTER COLUMN "kwh" TYPE NUMERIC`,
    );
    await queryRunner.query(
      `ALTER TABLE "water" ALTER COLUMN "cubicmeter" TYPE NUMERIC`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "water" ALTER COLUMN "cubicmeter" TYPE INTEGER`,
    );
    await queryRunner.query(
      `ALTER TABLE "power" ALTER COLUMN "kwh" TYPE INTEGER`,
    );
    await queryRunner.query(
      `ALTER TABLE "oil" ALTER COLUMN "filled" TYPE INTEGER`,
    );
  }
}
