import { ArgumentMetadata, Param, ParseUUIDPipe } from '@nestjs/common';

export const IdParam = (prop = 'id') => {
  return Param(prop, new EnhancedParseUUIDPipe({}));
};

export class EnhancedParseUUIDPipe extends ParseUUIDPipe {
  override async transform(
    value: string,
    metadata: ArgumentMetadata
  ): Promise<string> {
    try {
      return await super.transform(value, metadata);
    } catch {
      throw this.exceptionFactory(
        `${metadata.data} must be a valid UUID. Received: ${value}`
      );
    }
  }
}
