import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMarketStatus1704208044310 implements MigrationInterface {
  name = 'CreateMarketStatus1704208044310';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "market_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "tradingPair" character varying NOT NULL, "lastPrice" double precision NOT NULL, "volumen" double precision NOT NULL, "requestDate" TIMESTAMP, CONSTRAINT "PK_931049693aabb80b7162f30dc23" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "market_status"`);
  }
}
