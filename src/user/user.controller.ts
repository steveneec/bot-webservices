import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getUserById(@Request() req: Request) {
    return this.userService.getUserById((req as any).user.id);
  }
}
