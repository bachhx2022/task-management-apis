import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: Buffer | object, options?: JwtSignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  verify<T extends object = any>(token: string, options?: JwtVerifyOptions) {
    try {
      return this.jwtService.verify<T>(token, options);
    } catch (error) {
      console.error('Error verifying token', error);
      return;
    }
  }
}
