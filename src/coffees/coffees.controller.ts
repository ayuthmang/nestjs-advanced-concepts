import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
  RequestTimeoutException,
} from '@nestjs/common';
import { CoffeesDataSource, CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { COFFEES_DATA_SOURCE } from './coffees.constants';
import { CircuitBreakerInterceptor } from 'src/common/interceptors/circuit-breaker/circuit-breaker.interceptor';

@UseInterceptors(CircuitBreakerInterceptor) // 👈 use new interceptor
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    // try this two lines and see build/coffees.controller.js
    // private readonly dataSource: CoffeesDataSource,
    @Inject(COFFEES_DATA_SOURCE) private readonly dataSource: CoffeesDataSource,
  ) {}

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Get()
  findAll() {
    console.log('🦊 "findAll" executed');
    throw new RequestTimeoutException('💥 Error!'); // 👈
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(+id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(+id);
  }
}
