import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { CONTACTS } from '../../../shared/enums/CONTACTS';

import { Donator } from './Donator';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: CONTACTS })
  type: string;

  @Column()
  contact: string;

  @Column()
  donatorId: string;

  @ManyToOne(() => Donator, (donator) => donator.contacts)
  @JoinColumn({ name: 'donatorId', referencedColumnName: 'id' })
  donator: Donator;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
