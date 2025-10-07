import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ValidatedUser,
  RegisterRequestDto,
  LoginResponseDto,
} from '../../../auth/src/dto';
import { Observable } from 'rxjs';
import { Profile } from 'apps/profiles/generated/prisma';

@Injectable()
export class AuthGatewayService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,
  ) {}

  validateUser(email: string, password: string): Observable<ValidatedUser> {
    return this.authClient.send('auth.validateUser', { email, password });
  }

  register(registerData: RegisterRequestDto): Observable<Profile> {
    return this.authClient.send('auth.register', registerData);
  }

  login(user: ValidatedUser): Observable<LoginResponseDto> {
    return this.authClient.send('auth.login', user);
  }
}
