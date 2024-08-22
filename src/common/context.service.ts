import { UserPrincipal } from '@app/libs';
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  get user(): UserPrincipal {
    return this.request['user'];
  }

  get userId(): string {
    return this.user.userId;
  }

  get email(): string {
    return this.user.email;
  }

  get tokenId(): string {
    return this.user?.tokenId;
  }

  get refreshTokenId(): string {
    return this.user?.refreshTokenId;
  }
}
