import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { COFFEES_DATA_SOURCE } from './coffees.constants';

// 📝 coffees.module.ts - Create Symbol for COFFEES_DATA_SOURCE
// export const COFFEES_DATA_SOURCE = Symbol('COFFEES_DATA_SOURCE');

@Module({
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEES_DATA_SOURCE, // 👈
      useValue: [],
    },
  ],
})
export class CoffeesModule {}
