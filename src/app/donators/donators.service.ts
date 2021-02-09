import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { Donator } from '../../shared/database/entities/Donator';
import { User } from '../../shared/database/entities/User';

import { CreateDonatorDTO } from './DTO/createDonatorDTO';

@Injectable()
export class DonatorsService {
  constructor(
    @InjectRepository(Donator) private readonly donatorRepository: Repository<Donator>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
      return { donator, user };
    });
  }

  async findAll() {
    const qb = this.donatorRepository.createQueryBuilder('donator');
    const [donators, count] = await qb
      .leftJoinAndSelect('donator.user', 'users')
      .select([
        'donator.id',
        'donator.name',
        'donator.type',
        'donator.document',
        'donator.birth',
        'donator.createdAt',
        'donator.updatedAt',
        'users.id',
        'users.email',
        'users.status',
      ])
      .getManyAndCount();

    return { donators, count };
  }

  async checkIfDonatorExistsByDocument(document: string) {
    return (await this.donatorRepository.count({ where: { document } })) > 0;
  }
}
