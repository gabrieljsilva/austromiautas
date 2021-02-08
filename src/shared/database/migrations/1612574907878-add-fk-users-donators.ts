import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class addFkUsersDonators1612574907878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createForeignKey(
      'donators',
      new TableForeignKey({
        name: 'donatorHasOneUser',
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropForeignKey('donators', 'donatorHasOneUser');
  }
}
