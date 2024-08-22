import { Injectable } from '@nestjs/common';
import { RegisterUserRequest } from './dtos';
import { v7 as uuidv7 } from 'uuid';
import {
  EncryptService,
  ExistingResourceException,
  OkResponseDto,
  UserRepository,
} from '@app/libs';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly encryptService: EncryptService,
  ) {}

  async register(request: RegisterUserRequest) {
    const existingUserByEmail = await this.userRepo.findOne({
      email: request.email,
    });

    if (existingUserByEmail) {
      throw new ExistingResourceException(
        `User with email ${request.email} already exists.`,
      );
    }

    const hashedPassword = await this.encryptService.hash(request.password);

    const user = this.userRepo.create({
      id: uuidv7(),
      firstName: request.firstName,
      lastName: request.lastName,
      fullName: `${request.firstName} ${request.lastName}`,
      email: request.email,
      password: hashedPassword,
    });

    await this.userRepo.persistAndFlush(user);

    return new OkResponseDto({ id: user.id });
  }
}
