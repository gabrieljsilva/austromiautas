import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Resource } from './Resource';
import { Role } from './Role';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role_id: string;

  @Column()
  resource_id: string;

  @Column({ enum: ['POST', 'GET', 'PUT', 'DELETE'] })
  method: string;

  @ManyToOne(() => Resource)
  @JoinColumn({ name: 'resource_id', referencedColumnName: 'id' })
  resource: Resource;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;
}
