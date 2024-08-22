import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BaseRepository } from './base.repository';
import { UserTokenEntity } from '../entities';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class UserTokenRepository extends BaseRepository<UserTokenEntity> {
  constructor(
    @InjectRepository(UserTokenEntity)
    repository: EntityRepository<UserTokenEntity>
  ) {
    super(repository);
  }
}
