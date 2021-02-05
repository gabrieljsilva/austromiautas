import { Injectable, ConflictException } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/createuserDto';

@Injectable()
export class UsersActions {
  constructor(private readonly usersService: UsersService) {}

  async create(userDTO: CreateUserDTO) {
    const userExists = await this.usersService.checkIfUserExistsByEmail(userDTO.email);

    if (userExists) {
      throw new ConflictException('user already exists');
    }

    const user = await this.usersService.store(userDTO);
    delete user.password;
    return user;
  }

  async list() {
    return this.usersService.findAll();
  }
}
