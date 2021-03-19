import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccessToken } from '../../shared/database/entities/AccessToken';
import { UsersService } from '../users/users.service';
import { host } from 'src/shared/smtp/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(AccessToken) private accessTokenRepository: Repository<AccessToken>,
  ) {}

  async onModuleInit() {
    if (process.env.ALLOW_INSECURE_REQUESTS === 'true') {
      const localHostnames = ['localhost', '0.0.0.0', '127.0.0.1'];
      await Promise.all(
        localHostnames.map(async (hostname) => {
          const localAccessToken = await this.findAccessTokenByHost(hostname);
          if (!localAccessToken) {
            const accessToken = this.accessTokenRepository.create({
              host: hostname,
              protocol: 'http',
              description: 'development',
              port: '80',
            });

            await this.accessTokenRepository.save(accessToken);
          }
        }),
      );
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    const userNotExists = !user;

    if (userNotExists) return null;
    if (user.status !== 'active') return null;

    const match = await compare(password, user.password);

    if (!match) return null;

    return user;
  }

  async issueAccessToken(userId: string) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  async findAccessToken(token: string, host: string) {
    return this.accessTokenRepository.findOne({ where: { id: token, host } });
  }

  async findAccessTokenByHost(host: string) {
    return this.accessTokenRepository.findOne({ where: { host } });
  }
}
