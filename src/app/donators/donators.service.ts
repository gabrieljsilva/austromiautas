import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { Donator } from '../../shared/database/entities/Donator';
import { User } from '../../shared/database/entities/User';
import { UserRole } from '../../shared/database/entities/UserRole';
import { Role } from '../../shared/database/entities/Role';

import { CreateDonatorDTO } from './DTO/createDonatorDTO';

@Injectable()
export class DonatorsService {
  constructor(
    @InjectRepository(Donator) private readonly donatorRepository: Repository<Donator>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async store(createDonatorDTO: CreateDonatorDTO) {
    return this.connection.transaction(async (entityManager) => {
      const user = this.userRepository.create({
        email: createDonatorDTO.email,
        password: createDonatorDTO.password,
        status: 'waiting',
      });
      await entityManager.save(user);

      const donator = this.donatorRepository.create({
        name: createDonatorDTO.name,
        type: createDonatorDTO.type,
        document: createDonatorDTO.document,
        birth: createDonatorDTO.birth,
        userId: user.id,
      });
      await entityManager.save(donator);

      const donatorRole = await this.roleRepository.findOne({ where: { name: 'donator' } });

      const userRole = this.userRoleRepository.create({ role_id: donatorRole.id, user_id: user.id });
      await entityManager.save(userRole);

      return { donator, user };
    });
  }

  async findAllJuridicalPerson() {
    const qb = this.donatorRepository.createQueryBuilder('donator');
    const [donators, count] = await qb
      .leftJoinAndSelect('donator.user', 'users')
      .select([
        'donator.id',
        'donator.name',
        'donator.document',
        'donator.createdAt',
        'donator.updatedAt',
        'users.id',
        'users.email',
      ])
      .where('type = :type', { type: 'cnpj' })
      .andWhere('users.status = :status', { status: 'active' })
      .getManyAndCount();

    return { donators, count };
  }

  async checkIfDonatorExistsByDocument(document: string) {
    return (await this.donatorRepository.count({ where: { document } })) > 0;
  }
}
