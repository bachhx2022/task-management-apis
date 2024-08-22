import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
  Rel,
} from '@mikro-orm/core';
import { UserStatus } from '@app/libs/enums';
import { v7 as uuidv7 } from 'uuid';

@Entity({ tableName: 'users' })
export class UserEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv7();

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  fullName: string;

  @Property()
  email: string;

  @Property({ nullable: true })
  phone?: string;

  @Property({ hidden: true })
  password: string;

  @Enum(() => UserStatus)
  status: UserStatus = UserStatus.ACTIVE;

  @Property()
  createdAt = new Date();

  @ManyToOne(() => UserEntity, { nullable: true })
  createdBy: Rel<UserEntity>;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @ManyToOne(() => UserEntity, { nullable: true })
  updatedBy: Rel<UserEntity>;
}
