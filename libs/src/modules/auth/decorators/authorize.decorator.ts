import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthorizeGuard } from '../guards/authorize.guard';
import { ALLOW_ANONYMOUS_KEY } from './meta-keys';

export const BaseAuthorize = () => applyDecorators(UseGuards(AuthorizeGuard));

export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS_KEY, true);
