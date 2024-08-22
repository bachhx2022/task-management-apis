import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as _ from 'lodash';
import { UsersService } from '../users.service';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    const userInfo = await this.usersService.getByToken(token);

    request['user'] = userInfo;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    //@ts-ignore
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
