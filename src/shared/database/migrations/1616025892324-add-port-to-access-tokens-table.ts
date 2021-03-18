import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addPortToAccessTokensTable1616025892324 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.addColumn(
      'access_tokens',
      new TableColumn({
        name: 'port',
        type: 'varchar',
        isNullable: false,
        default: '80',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropColumn('access_tokens', 'port');
  }
}
