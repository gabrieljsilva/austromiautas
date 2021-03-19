import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addedAvatarColumToDonator1616186785192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.addColumn(
      'donators',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropColumn('donators', 'avatar');
  }
}
