import 'dotenv/config';
import { Injectable, ConflictException } from '@nestjs/common';

import { DonatorsService } from './donators.service';
import { UsersService } from '../users/users.service';
import { EmailsService } from '../emails/emails.service';

import { CreateDonatorDTO } from './DTO/createDonatorDTO';

@Injectable()
export class DonatorsActions {
  constructor(
    private readonly donatorService: DonatorsService,
    private readonly usersService: UsersService,
    private readonly emailsService: EmailsService,
  ) {}

  async create(createDonatorDTO: CreateDonatorDTO) {
    const userAlreadyExistsWithEmail = await this.usersService.checkIfUserExistsByEmail(createDonatorDTO.email);
    if (userAlreadyExistsWithEmail) {
      throw new ConflictException('user already exists');
    }

    const userAlreadyExistsWithDocument = await this.donatorService.checkIfDonatorExistsByDocument(
      createDonatorDTO.document,
    );
    if (userAlreadyExistsWithDocument) {
      throw new ConflictException('user already exists');
    }

    const { donator, user } = await this.donatorService.store(createDonatorDTO);

    const token = await this.usersService.issueActivationToken(user.id);
    const magicLink = `${createDonatorDTO.frontEndActivationUrl}?token=${token}`;

    await this.emailsService.sendConfirmAccountEmail(createDonatorDTO.email, {
      userName: createDonatorDTO.name,
      magicLink,
    });

    return donator;
  }

  async list() {
    return this.donatorService.findAllJuridicalPerson();
  }
}
