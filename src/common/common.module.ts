import { Global, Module } from '@nestjs/common';
import { ContextService } from './context.service';

@Global()
@Module({
  controllers: [],
  providers: [ContextService],
  exports: [ContextService],
})
export class CommonModule {}
