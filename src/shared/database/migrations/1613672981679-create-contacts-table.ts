import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { CONTACTS } from '../../enums/CONTACTS';

export class createContactsTable1613672981679 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'contacts',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'type',
            type: 'enum',
            enum: Object.values(CONTACTS),
            isNullable: false,
          },
          {
            name: 'contact',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'donatorId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('contacts');
  }
}
