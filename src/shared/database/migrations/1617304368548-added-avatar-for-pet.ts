import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addedAvatarForPet1617304368548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.addColumn(
      'pets',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropColumn('pets', 'avatar');
  }
}
