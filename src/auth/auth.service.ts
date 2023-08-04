import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO, SignInUserDTO } from 'src/dto/user.dtos';
import { EncryptHelper } from 'src/helpers/EncryptHelper';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly useService: UserService,
    private readonly jwtService: JwtService, //private readonly mailService: MailerService,
  ) {}

  async signup(createUserDTO: CreateUserDTO) {
    const user = await this.useService.createUser(createUserDTO);
    return { authToken: this.jwtService.sign({ id: user }) };
  }

  async signin(signinUserDTO: SignInUserDTO) {
    const user = await this.useService.getUser(signinUserDTO.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const match = await EncryptHelper.compareString(
      signinUserDTO.password,
      user.password,
    );

    if (!match) {
      throw new UnauthorizedException();
    }

    return {
      authToken: this.jwtService.sign({ id: user._id }),
    };
  }

  async verifyUser(token: string) {}
}
