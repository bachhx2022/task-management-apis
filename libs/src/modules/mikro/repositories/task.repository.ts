import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BaseRepository } from './base.repository';
import { TaskEntity } from '../entities';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class TaskRepository extends BaseRepository<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    repository: EntityRepository<TaskEntity>
  ) {
    super(repository);
  }
}
