import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
  Rel,
} from '@mikro-orm/core';
import { UserEntity } from './user.entity';
import { v7 as uuidv7 } from 'uuid';

@Entity({ tableName: 'tasks' })
export class TaskEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv7();

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property({nullable: true})
  isCompleted?: boolean = false;

  @Property()
  createdAt = new Date();

  @ManyToOne(() => UserEntity, { nullable: true })
  createdBy: Rel<UserEntity>;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @ManyToOne(() => UserEntity, { nullable: true })
  updatedBy: Rel<UserEntity>;
}
