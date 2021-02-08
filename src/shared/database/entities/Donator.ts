import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './User';

@Entity('donators')
export class Donator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ enum: ['cpf', 'cnpj'], default: 'cpf' })
  type: string;

  @Column()
  document: string;

  @Column()
  birth: Date;

  @Column()
  userId: string;

  @OneToOne((type) => User)
  @JoinColumn({ referencedColumnName: 'id', name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
