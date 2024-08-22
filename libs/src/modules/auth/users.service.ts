import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';
import { UserTokenEntity, UserTokenRepository } from '../mikro';
import { AUTH_MODULE_OPTIONS } from './constants';
import { AuthModuleOptions } from './interfaces';
import { AccessTokenPayload } from './types';
import { JwtAuthService } from '../common';
import { TokenType, UserStatus } from '@app/libs/enums';
import { UserUnauthorizedException } from '@app/libs/exceptions';

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTH_MODULE_OPTIONS) private config: AuthModuleOptions,
    private readonly jwtService: JwtAuthService,
    private readonly userTokenRepo: UserTokenRepository,
  ) {}

  public async getByToken(token: string | null | undefined) {
    
    if (!token) {
      throw new UnauthorizedException(
        'Invalid token provided. Please provide a valid token.',
      );
    }
  
    const payload = this.jwtService.verify<AccessTokenPayload>(token, {
      secret: this.config.jwtTokenSecret,
    });

    if (!payload) {
      throw new UserUnauthorizedException(
        'Invalid token provided. Please provide a valid token.',
      );
    }

    let tokenEntity: UserTokenEntity | null = null;
    if (!tokenEntity) {
      tokenEntity = await this.userTokenRepo.findOne(
        {
          id: payload.tid,
          type: TokenType.ACCESS_TOKEN,
          expiredAt: { $gt: new Date() },
        },
        {
          populate: ['user'],
        },
      );
    }

    if (!tokenEntity || moment(tokenEntity.expiredAt).isBefore(moment())) {
      throw new UnauthorizedException('Token not found or expired');
    }

    const user = tokenEntity.user;

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('User is not active');
    }

    return {
      userId: user.id,
      email: user.email,
      tokenId: payload.tid,
      refreshTokenId: payload.rtid,
    };
  }
}
