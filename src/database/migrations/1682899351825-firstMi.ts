import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMi1682899351825 implements MigrationInterface {
    name = 'firstMi1682899351825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reccadosMi"."note" ("id" character varying NOT NULL, "detail" character varying NOT NULL, "description" character varying NOT NULL, "arquived" boolean NOT NULL, "id_user" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reccadosMi"."user" ("id" character varying NOT NULL, "name" character varying(30) NOT NULL, "email" character varying(64) NOT NULL, "password" character varying(32) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reccadosMi"."note" ADD CONSTRAINT "FK_f4f182421a89338bdc432d6adf7" FOREIGN KEY ("id_user") REFERENCES "reccadosMi"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reccadosMi"."note" DROP CONSTRAINT "FK_f4f182421a89338bdc432d6adf7"`);
        await queryRunner.query(`DROP TABLE "reccadosMi"."user"`);
        await queryRunner.query(`DROP TABLE "reccadosMi"."note"`);
    }

}
