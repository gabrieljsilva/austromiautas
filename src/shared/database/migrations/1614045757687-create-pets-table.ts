import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { PETS } from '../../enums/PETS';
import { GENDERS } from '../../enums/GENDERS';

export class createPetsTable1614045757687 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'pets',
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
            enum: Object.values(PETS),
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'enum',
            enum: Object.values(GENDERS),
            isNullable: false,
          },
          {
            name: 'isCastrated',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'isVaccinated',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'approximatedAge',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'adoptionReason',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'extraInformations',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'adopterName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'adopterCPF',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'adopterBirth',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'adoptionStatus',
            type: 'enum',
            enum: ['waiting', 'in_progress', 'adopted'],
            default: "'waiting'",
          },
          {
            name: 'donatorId',
            type: 'varchar',
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
    return queryRunner.dropTable('pets');
  }
}
