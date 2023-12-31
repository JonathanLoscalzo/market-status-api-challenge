import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from 'src/core/core.module';
import { ResourcesModule } from 'src/resources/resources.module';
import { LoggerMiddleware } from 'src/core/middlewares/logger/logger.middleware';

@Module({
  imports: [CoreModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
