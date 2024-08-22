import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserPrincipal } from './types/user-principal';

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  get user(): UserPrincipal {
    //@ts-ignore
    return this.request['user'];
  }

  get userId(): string {
    return this.user.userId;
  }
}
