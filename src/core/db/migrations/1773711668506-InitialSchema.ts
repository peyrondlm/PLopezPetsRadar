import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1773711668506 implements MigrationInterface {
    name = 'InitialSchema1773711668506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lost_pets" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "species" character varying NOT NULL, "breed" character varying, "color" character varying, "size" character varying, "description" text, "photo_url" character varying, "owner_name" character varying NOT NULL, "owner_email" character varying NOT NULL, "owner_phone" character varying, "location" geometry(Point,4326) NOT NULL, "address" character varying, "lost_date" TIMESTAMP WITH TIME ZONE NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_4ba852a354b48000bcb3faaaea5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "found_pets" ("id" SERIAL NOT NULL, "species" character varying NOT NULL, "breed" character varying, "color" character varying, "size" character varying, "description" text, "photo_url" character varying, "finder_name" character varying NOT NULL, "finder_email" character varying NOT NULL, "finder_phone" character varying, "location" geometry(Point,4326) NOT NULL, "address" character varying, "found_date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_1e8aeb0b37dd97bfce972552b8d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "found_pets"`);
        await queryRunner.query(`DROP TABLE "lost_pets"`);
    }

}
