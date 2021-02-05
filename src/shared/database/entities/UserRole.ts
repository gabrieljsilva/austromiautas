import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users_roles')
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  role_id: string;
}
