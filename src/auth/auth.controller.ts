import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO, SignInUserDTO } from 'src/dto/user.dtos';
import { AuthService } from './auth.service';
import { HandleError } from 'src/helpers/ErrorHandler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signin(@Body() createUserDTO: CreateUserDTO) {
    try {
      return await this.authService.signup(createUserDTO);
    } catch (error) {
      return HandleError(error);
    }
  }

  @Post('signin')
  signup(@Body() signInUserDTO: SignInUserDTO) {
    try {
      return this.authService.signin(signInUserDTO);
    } catch (error) {
      return HandleError(error);
    }
  }
}
