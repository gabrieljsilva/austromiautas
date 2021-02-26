import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { PETS } from '../../enums/PETS';
import { GENDERS } from '../../enums/GENDERS';
import { ADOPTION_STATUS } from '../../enums/ADOPTION_STATUS';

import { Donator } from './Donator';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ enum: PETS })
  type: PETS;

  @Column({ enum: GENDERS })
  gender: GENDERS;

  @Column()
  isCastrated: boolean;

  @Column()
  isVaccinated: boolean;

  @Column()
  approximatedAge: string;

  @Column()
  adoptionReason: string;

  @Column()
  extraInformations: string;

  @Column({ nullable: true })
  adopterName: string;

  @Column({ nullable: true })
  adopterCPF: string;

  @Column({ nullable: true })
  adopterBirth: Date;

  @Column({ enum: ADOPTION_STATUS })
  adoptionStatus: ADOPTION_STATUS;

  @Column()
  donatorId: string;

  @ManyToOne(() => Donator)
  @JoinColumn({ name: 'donatorId', referencedColumnName: 'id' })
  donator: Donator;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
