import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MarketStatusModule } from './market-status/market-status.module';
import { LoggerMiddleware } from 'src/core/middlewares/logger/logger.middleware';

@Module({
  imports: [MarketStatusModule],
})
export class ResourcesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude('health').forRoutes('*');
  }
}
