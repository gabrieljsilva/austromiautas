import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Contact } from './Contact';
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

  @OneToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id', name: 'userId' })
  user: User;

  @OneToMany(() => Contact, (donator) => donator.contact)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  contacts: Contact[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
