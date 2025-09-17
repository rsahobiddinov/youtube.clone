import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      token = request.cookies?.token;
    }

    if (!token) {
      console.log('Token topilmadi');
      throw new ForbiddenException('Token topilmadi');
    }

    try {
      console.log('Token:', token);

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      console.log('JWT payload:', payload);

      const id: string = payload.userId;
      // const role = payload.role;

      if (!id || typeof id !== 'string') {
        console.log('Notogri id:', id);
        throw new ForbiddenException('Token ichida ID notogri');
      }

      console.log("Foydalanuvchi ma'lumotlari:", { id });
      request.userId = id;

      return true;
    } catch (error) {
      console.log('Token tekshirish xatosi:', error.message);
      throw new ForbiddenException('Token invalid');
    }
  }
}
