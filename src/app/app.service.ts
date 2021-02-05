import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from '../shared/database/entities/User';
import { Role } from '../shared/database/entities/Role';
import { UserRole } from '../shared/database/entities/UserRole';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}
}
