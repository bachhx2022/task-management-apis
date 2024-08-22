import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as moment from 'moment-timezone';

import { ConfigType } from '@nestjs/config';
import { v7 as uuidv7 } from 'uuid';
import { LoginRequest, RefreshTokenRequest } from './dtos';
import {
  AccessTokenPayload,
  authConfig,
  EncryptService,
  JwtAuthService,
  NotFoundResourceException,
  OkResponseDto,
  RefreshTokenPayload,
  TokenType,
  UserEntity,
  UserRepository,
  UserStatus,
  UserTokenEntity,
  UserTokenRepository,
  UserUnauthorizedException,
} from '@app/libs';
import { ContextService } from '../common/context.service';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConf: ConfigType<typeof authConfig>,
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtAuthService,
    private readonly ctx: ContextService,
    private readonly userRepo: UserRepository,
    private readonly userTokenRepo: UserTokenRepository,
    private readonly em: EntityManager,
  ) {}

  async login(request: LoginRequest, authorization: string) {
    const user = await this.userRepo.findOne({
      email: request.email,
    });

    await this.isValidUser(user);
    if (!this.checkCredentials(request, user.password)) {
      throw new UnauthorizedException(
        'Invalid email or password. Please verify your credentials and try again',
      );
    }

    const oldAccessTokenPayload = this.jwtService.verify<AccessTokenPayload>(
      this.extractToken(authorization),
      {
        secret: this.authConf.jwtTokenSecret,
      },
    );

    const tokenId = oldAccessTokenPayload?.tid || uuidv7();
    const refreshTokenId = oldAccessTokenPayload?.rtid || uuidv7();

    const accessToken = await this.generateTokens(
      refreshTokenId,
      tokenId,
      user,
    );
    const refreshToken = await this.generateRefreshTokens(
      refreshTokenId,
      tokenId,
      user,
    );

    await this.em.flush();

    return new OkResponseDto({
      accessToken,
      refreshToken,
    });
  }

  async refreshToken(request: RefreshTokenRequest) {
    const payload = this.jwtService.verify<RefreshTokenPayload>(
      request.refreshToken,
      {
        secret: this.authConf.jwtRefreshTokenSecret,
      },
    );

    const refreshToken = await this.userTokenRepo.findOne(
      {
        id: payload.rtid,
        type: TokenType.REFRESH_TOKEN,
        expiredAt: { $gt: new Date() },
      },
      { populate: ['user'] },
    );

    if (!refreshToken) {
      throw new NotFoundResourceException('Refresh token not found');
    }

    const user = refreshToken.user;
    await this.isValidUser(user);

    const accessToken = await this.generateTokens(
      payload.rtid,
      payload.tid,
      user,
    );

    await this.em.flush();

    return new OkResponseDto({
      accessToken,
    });
  }

  async logout() {
    const tokenId = this.ctx.tokenId;
    const refreshTokenId = this.ctx.refreshTokenId;
    const token = this.em.getReference(UserTokenEntity, tokenId);
    const refreshToken = this.em.getReference(UserTokenEntity, refreshTokenId);

    this.userTokenRepo.remove(token);
    this.userTokenRepo.remove(refreshToken);

    await this.em.flush();
  }

  private async isValidUser(user: UserEntity) {
    if (!user) {
      throw new NotFoundResourceException('User not found');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UserUnauthorizedException('User is not active');
    }
  }

  private checkCredentials(request: LoginRequest, hashedPassword: string) {
    return this.encryptService.compareHash(request.password, hashedPassword);
  }

  private async generateTokens(
    refreshTokenId: string,
    tokenId: string,
    user: UserEntity,
  ) {
    const expiredAt = moment().add(3, 'day');

    const payload: AccessTokenPayload = {
      rtid: refreshTokenId,
      tid: tokenId,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: expiredAt.diff(moment(), 'milliseconds'),
      secret: this.authConf.jwtTokenSecret,
    });

    const userToken = this.userTokenRepo.create({
      id: tokenId,
      type: TokenType.ACCESS_TOKEN,
      user,
      expiredAt: expiredAt.toDate(),
    });

    await this.userTokenRepo.upsert(userToken);

    return token;
  }

  private async generateRefreshTokens(
    refreshTokenId: string,
    tokenId: string,
    user: UserEntity,
  ) {
    const expiredAt = moment().add(7, 'day');

    const payload: RefreshTokenPayload = {
      rtid: refreshTokenId,
      tid: tokenId,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: expiredAt.diff(moment(), 'milliseconds'),
      secret: this.authConf.jwtRefreshTokenSecret,
    });

    const userToken = this.userTokenRepo.create({
      id: refreshTokenId,
      type: TokenType.REFRESH_TOKEN,
      user,
      expiredAt: expiredAt.toDate(),
    });

    await this.userTokenRepo.upsert(userToken);

    return token;
  }

  private extractToken(authorization?: string): string | undefined {
    const [type, token] = authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
