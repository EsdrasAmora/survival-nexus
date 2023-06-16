import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Token, TokenData } from '../auth/token-data.decorator';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { LoginDto } from './dto/login.dto';
import { SurvivorService } from './survivor.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  me(@Token() { survivorId }: TokenData) {
    return this.survivorService.findOneById(survivorId);
  }
}
