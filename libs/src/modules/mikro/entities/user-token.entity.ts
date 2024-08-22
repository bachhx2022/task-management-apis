import { Entity, Enum, ManyToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import { UserEntity } from './user.entity';
import { TokenType } from '@app/libs/enums';
import { v7 as uuidv7 } from 'uuid';

@Entity({ tableName: 'user_tokens' })
export class UserTokenEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv7();

  @Enum(() => TokenType)
  type: TokenType;

  @ManyToOne(() => UserEntity, { nullable: true })
  user: Rel<UserEntity>;

  @Property()
  expiredAt = new Date();

  @Property()
  createdAt = new Date();

  @ManyToOne(() => UserEntity, { nullable: true })
  createdBy: Rel<UserEntity>;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @ManyToOne(() => UserEntity, { nullable: true })
  updatedBy: Rel<UserEntity>;
}
