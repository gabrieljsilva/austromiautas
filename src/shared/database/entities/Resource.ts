import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
