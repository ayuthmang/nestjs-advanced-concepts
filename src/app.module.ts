import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { SchedulerModule } from './scheduler/scheduler.module';
// import { CronModule } from './cron/cron.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';
import { HttpClientModule } from './http-client/http-client.module';

@Module({
  imports: [
    CoffeesModule,
    SchedulerModule,
    FibonacciModule,
    HttpClientModule.register({ baseUrl: 'http://nestjs.com' }), // 👈
    HttpClientModule.register({ baseUrl: 'http://nestjs.com' }), // 👈
    HttpClientModule.register({ baseUrl: 'http://nestjs.com' }),

    // ⚠️  Alternatively:
    // HttpClientModule.registerAsync({
    //   useFactory: () => ({ baseUrl: 'http://nestjs.com' }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
