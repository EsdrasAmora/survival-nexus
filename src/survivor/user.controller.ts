import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Token, TokenData } from '../auth/token-data.decorator';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { LoginDto } from './dto/login.dto';
import { SurvivorService } from './survivor.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AcessTokenDto } from './entities/acess-token.dto';
import { Survivor } from './entities/survivor.entity';

@Controller('users')
export class UserController {
  constructor(private readonly survivorService: SurvivorService) {}

  @Post()
  @ApiResponse({
    status: 201,
    type: AcessTokenDto,
  })
  create(@Body() createSurvivorDto: CreateSurvivorDto): Promise<AcessTokenDto> {
    return this.survivorService.create(createSurvivorDto);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    type: AcessTokenDto,
  })
  login(@Body() createSurvivorDto: LoginDto): Promise<AcessTokenDto> {
    return this.survivorService.login(createSurvivorDto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: Survivor,
  })
  me(@Token() { survivorId }: TokenData): Promise<Survivor> {
    return this.survivorService.findOneById(survivorId);
  }
}
