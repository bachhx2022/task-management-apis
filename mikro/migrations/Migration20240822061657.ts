import { Migration } from '@mikro-orm/migrations';

export class Migration20240822061657 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "users" ("id" uuid not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "full_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) null, "password" varchar(255) not null, "status" text check ("status" in (\'PENDING_ACTIVE\', \'ACTIVE\', \'INACTIVE\')) not null default \'ACTIVE\', "created_at" timestamptz not null, "created_by_id" uuid null, "updated_at" timestamptz not null, "updated_by_id" uuid null, constraint "users_pkey" primary key ("id"));');

    this.addSql('create table "tasks" ("id" uuid not null, "title" varchar(255) not null, "description" varchar(255) not null, "is_completed" boolean null default false, "created_at" timestamptz not null, "created_by_id" uuid null, "updated_at" timestamptz not null, "updated_by_id" uuid null, constraint "tasks_pkey" primary key ("id"));');

    this.addSql('create table "user_tokens" ("id" uuid not null, "type" text check ("type" in (\'ACCESS_TOKEN\', \'REFRESH_TOKEN\', \'API_KEY\')) not null, "user_id" uuid null, "expired_at" timestamptz not null, "created_at" timestamptz not null, "created_by_id" uuid null, "updated_at" timestamptz not null, "updated_by_id" uuid null, constraint "user_tokens_pkey" primary key ("id"));');

    this.addSql('alter table "users" add constraint "users_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "users" add constraint "users_updated_by_id_foreign" foreign key ("updated_by_id") references "users" ("id") on update cascade on delete set null;');

    this.addSql('alter table "tasks" add constraint "tasks_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "tasks" add constraint "tasks_updated_by_id_foreign" foreign key ("updated_by_id") references "users" ("id") on update cascade on delete set null;');

    this.addSql('alter table "user_tokens" add constraint "user_tokens_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user_tokens" add constraint "user_tokens_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user_tokens" add constraint "user_tokens_updated_by_id_foreign" foreign key ("updated_by_id") references "users" ("id") on update cascade on delete set null;');
  }

}
