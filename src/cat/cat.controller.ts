import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { Cat } from './cat.model';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { CatService } from './cat.service';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() cat: Cat) {
    this.catService.create(cat);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<Cat[]> {
    return this.catService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:catId')
  getById(@Param('catId') catId: string) {
    return this.catService.getById(catId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/edit/:catID')
  update(@Param('catID') catID: string, @Body() newCat: Cat): Promise<Cat> {
    return this.catService.update(catID, newCat);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/remove/:catID')
  remove(@Param('catID') catID: string): Promise<Cat> {
    return this.catService.remove(catID);
  }
}
