import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // default field: username, password (ถ้าอยากใช้ email ให้ส่ง { usernameField: 'email' } เข้า super)
  constructor() {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    // const user = await this.authService.validateUser(username, password);
    const user = { id: '12345', email: email, password: password }; // TODO: Implement with real service
    if (!user) throw new UnauthorizedException('Invalid credentials');
    // ที่ return จะถูกผูกกับ req.user
    return user;
  }
}
