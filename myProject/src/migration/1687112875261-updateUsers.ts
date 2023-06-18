import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1687112875261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users MODIFY COLUMN gender INT COMMENT '1:male,2:female'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users MODIFY COLUMN gender INT`);
  }
}
