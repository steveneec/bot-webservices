export class CreateUserDTO {
  name: string;
  birthday: string;
  email: string;
  password: string;
}

export class SignInUserDTO {
  email: string;
  password: string;
}
