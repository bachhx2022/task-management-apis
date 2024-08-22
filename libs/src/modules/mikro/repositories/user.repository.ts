import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BaseRepository } from './base.repository';
import { UserEntity } from '../entities';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: EntityRepository<UserEntity>
  ) {
    super(repository);
  }
}
