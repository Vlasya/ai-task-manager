import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthRequest } from '../auth/types/auth-request.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signin')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: AuthRequest) {
    return this.usersService.findById(req.user!.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Req() req: AuthRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user!.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async delete(@Req() req: AuthRequest) {
    return this.usersService.delete(req.user!.id);
  }
}
