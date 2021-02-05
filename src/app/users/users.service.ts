import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../shared/database/entities/User';
import { Role } from '../../shared/database/entities/Role';
import { CreateUserDTO } from './dto/createuserDto';
import { EmailsService } from '../emails/emails.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly emailsService: EmailsService,
  ) {}

  async store(userDto: CreateUserDTO) {
    const user = this.userRepository.create(userDto);
    await this.userRepository.save(user);
    return user;
  }

  async findAll() {
    return this.userRepository.find({
      select: ['id', 'name', 'email', 'status', 'createdAt', 'updatedAt'],
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async findById(id: string) {
    return await this.userRepository.findOne({ id });
  }

  async checkIfUserExistsByEmail(email: string) {
    return (await this.userRepository.count({ email })) > 0;
  }

  async checkUserPermission(userId: string, resource: string, method: string) {
    const qb = this.userRepository.createQueryBuilder('users');
    return (
      (await qb
        .leftJoinAndSelect('users.roles', 'roles')
        .leftJoinAndSelect('roles.permissions', 'permissions')
        .leftJoinAndSelect('permissions.resource', 'resources')
        .where('users.id = :userId', { userId })
        .andWhere('resources.name = :resource', { resource })
        .andWhere('permissions.method = :method', { method })
        .getCount()) > 0
    );
  }

  async checkGuestPermission(resource: string, method: string) {
    const qb = this.roleRepository.createQueryBuilder('roles');
    const user =
      (await qb
        .leftJoinAndSelect('roles.permissions', 'permissions')
        .leftJoinAndSelect('permissions.resource', 'resources')
        .where('roles.name = :roleName', { roleName: 'guest' })
        .andWhere('permissions.method = :method', { method })
        .andWhere('resources.name = :resource', { resource })
        .getCount()) > 0;
    return user;
  }
}
