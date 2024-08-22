import { Inject, Injectable } from '@nestjs/common';
import { AES, enc, lib } from 'crypto-js';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { MISC_MODULE_OPTIONS } from './constants';
import { MiscModuleOptions } from './interfaces';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class EncryptService {
  constructor(@Inject(MISC_MODULE_OPTIONS) private config: MiscModuleOptions) {}

  encrypt<T>(data: T, secretKey?: string): string {
    return AES.encrypt(
      (typeof data === 'object' ? JSON.stringify(data) : data) as string,
      secretKey || this.config.secretKey
    ).toString();
  }

  decrypt(encryptedData: string, secretKey?: string): string {
    const bytes = AES.decrypt(
      encryptedData,
      secretKey || this.config.secretKey
    );
    return bytes.toString(enc.Utf8);
  }

  decryptAndTransform<T>(
    encryptedData: string,
    cls: ClassConstructor<T>,
    secretKey?: string
  ): T {
    const decryptedText = this.decrypt(encryptedData, secretKey);
    return plainToInstance(cls, JSON.parse(decryptedText));
  }

  async hash(data: string) {
    const salt = await bcryptjs.genSalt();
    return await bcryptjs.hash(data, salt);
  }

  compareHash(data: string, hash: string) {
    return bcryptjs.compareSync(data, hash);
  }

  genSecretKey() {
    return lib.WordArray.random(128 / 8).toString();
  }
}
