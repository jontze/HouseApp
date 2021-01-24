import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1610538712764 implements MigrationInterface {
  name = 'init1610538712764';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "oil" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "filled" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7687c431233413581eb1c765504" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "power" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "kwh" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9b965296b9f26727d54a5a0620e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "water" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "cubicmeter" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8fe16d29fb45be6c0de0b2ed6a3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "water"`);
    await queryRunner.query(`DROP TABLE "power"`);
    await queryRunner.query(`DROP TABLE "oil"`);
  }
}
