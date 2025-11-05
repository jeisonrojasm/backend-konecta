import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [forwardRef(() => UsersModule), PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'supersecret_jwt_key',
    signOptions: { expiresIn: '3600s' }
  })],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }