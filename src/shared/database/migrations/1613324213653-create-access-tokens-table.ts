import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAccessTokensTable1613324213653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'access_tokens',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'host',
            type: 'varchar',
            isUnique: false,
            isNullable: false,
          },
          {
            name: 'protocol',
            type: 'enum',
            enum: ['http', 'https'],
            isNullable: false,
            default: "'http'",
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
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
    return queryRunner.dropTable('access_tokens');
  }
}
