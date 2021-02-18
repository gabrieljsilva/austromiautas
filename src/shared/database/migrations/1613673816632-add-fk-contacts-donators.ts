import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class addFkContactsDonators1613673816632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createForeignKey(
      'contacts',
      new TableForeignKey({
        name: 'donatorHasManyContacts',
        columnNames: ['donatorId'],
        referencedTableName: 'donators',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropForeignKey('contacts', 'donatorHasManyContacts');
  }
}
