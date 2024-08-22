import { Injectable } from '@nestjs/common';
import { AnyEntity, EntityRepository } from '@mikro-orm/core';

@Injectable()
export class BaseRepository<T extends Object> extends EntityRepository<T> {
  constructor(repository: EntityRepository<T>) {
    super(repository.getEntityManager(), repository.getEntityName());
  }

  persist(entity: AnyEntity | AnyEntity[]) {
    return this.em.persist(entity);
  }

  async persistAndFlush(entity: T | T[]): Promise<void> {
    await this.em.persistAndFlush(entity);
  }

  remove(entity: T) {
    return this.em.remove(entity);
  }

  async removeAndFlush(entity: AnyEntity): Promise<void> {
    await this.em.removeAndFlush(entity);
  }

  async flush(): Promise<void> {
    return this.em.flush();
  }
}
