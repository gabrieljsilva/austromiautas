import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createDonatorTable1612572965320 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'donators',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['cpf', 'cnpj'],
            default: "'cpf'",
            isNullable: false,
          },
          {
            name: 'document',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'birth',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('donators');
  }
}
