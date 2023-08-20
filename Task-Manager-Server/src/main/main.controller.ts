import { Controller, Get } from '@nestjs/common';

@Controller('main')
export class MainController {
  @Get()
  getMain(): {message: string} {
    return { message: 'Main Routee' };
  }
}