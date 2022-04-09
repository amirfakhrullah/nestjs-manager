import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCred: AuthCredentialsDTO): Promise<void> {
    return this.usersRepository.createUser(authCred);
  }

  async signIn(
    authCreds: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCreds;

    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
