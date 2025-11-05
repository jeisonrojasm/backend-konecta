import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  /**
   * Endpoint para registrar un nuevo usuario
   * POST /api/v1/users/register
   * Recibe: { "username": "john", "password": "secret" }
   * Devuelve: { "access_token": "..." }
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    // Generar token inmediatamente después del registro
    const token = await this.authService.login(user);
    return token;
  }

  /**
   * Endpoint para iniciar sesión de usuario
   * POST /api/v1/users/login
   * Recibe: { "username": "john", "password": "secret" }
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      credentials.username,
      credentials.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return this.authService.login(user);
  }
}
