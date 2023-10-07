import { Inject, Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { COFFEES_DATA_SOURCE } from './coffees.constants';
// import { COFFEES_DATA_SOURCE } from './coffees.module';

// 📝 coffees.service.ts - Example interface in the same file
export interface CoffeesDataSource {
  // OR alternatively "export type CoffeesDataSource = Coffee[]"
  [index: number]: Coffee;
}

@Injectable()
export class CoffeesService {
  constructor(
    @Inject(COFFEES_DATA_SOURCE) private readonly dataSource: CoffeesDataSource,
  ) {
    console.log(this.dataSource);
  } // 👈

  create(createCoffeeDto: CreateCoffeeDto) {
    return 'This action adds a new coffee';
  }

  findAll() {
    return `This action returns all coffees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coffee`;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    return `This action updates a #${id} coffee`;
  }

  remove(id: number) {
    return `This action removes a #${id} coffee`;
  }
}
