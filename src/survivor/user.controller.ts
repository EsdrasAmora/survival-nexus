import { Body, Controller, Get, Post } from '@nestjs/common';
import { Token, TokenData } from '../auth/token-data.decorator';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { LoginDto } from './dto/login.dto';
import { SurvivorService } from './survivor.service';

@Controller('users')
export class UserController {
  constructor(private readonly survivorService: SurvivorService) {}

  @Post()
  create(@Body() createSurvivorDto: CreateSurvivorDto) {
    return this.survivorService.create(createSurvivorDto);
  }

  @Post('login')
  login(@Body() createSurvivorDto: LoginDto) {
    return this.survivorService.login(createSurvivorDto);
  }

  @Get('me')
  me(@Token() { survivorId }: TokenData) {
    return this.survivorService.findOneById(survivorId);
  }
}
