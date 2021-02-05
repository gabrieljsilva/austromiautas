import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPermissionsTable1610149706492 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'permissions',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'role_id',
            type: 'varchar',
            isUnique: false,
            isNullable: false,
          },
          {
            name: 'method',
            type: 'enum',
            enum: ['POST', 'GET', 'PUT', 'DELETE'],
            isNullable: false,
          },
          {
            name: 'resource_id',
            type: 'varchar',
            isUnique: false,
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('permissions');
  }
}
