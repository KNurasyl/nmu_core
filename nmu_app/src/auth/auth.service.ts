import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { GqlContext } from 'src/common/types/ctx';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthResponse } from './model/auth-response.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: RegisterInput): Promise<AuthResponse> {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const createUserInput = plainToInstance(CreateUserInput, {
      ...input,
      password: hashedPassword,
    });

    const user = await this.userService.create(createUserInput);

    const tokens = this.generateTokens(user);
    await this.userService.updateRefreshToken(user._id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      user,
    };
  }

  async login(input: LoginInput, ctx: GqlContext): Promise<AuthResponse> {
    const user = await this.userService.findByPhone(input.phoneNumber);
    const isMatch = await bcrypt.compare(input.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const tokens = this.generateTokens(user);

    await this.userService.updateRefreshToken(user._id, tokens.refreshToken);

    ctx.res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 дней
      path: '/',
    });

    return { accessToken: tokens.accessToken, user };
  }

  async refreshTokensFromCookie(ctx: GqlContext): Promise<AuthResponse> {
    const cookies = ctx.req.cookies as Record<string, string> | undefined;
    const refreshToken = cookies?.['refreshToken'];
    if (!refreshToken) throw new UnauthorizedException('No refresh token found');

    const user = await this.userService.findByRefreshToken(refreshToken);
    if (!user) throw new UnauthorizedException('Invalid refresh token');

    try {
      this.jwtService.verify(refreshToken);
    } catch {
      throw new UnauthorizedException('Expired or invalid refresh token');
    }

    const tokens = this.generateTokens(user);
    await this.userService.updateRefreshToken(user._id, tokens.refreshToken);

    ctx.res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: '/',
    });

    return { accessToken: tokens.accessToken, user };
  }

  async logout(userId: string) {
    await this.userService.updateRefreshToken(userId, null);
  }

  private generateTokens(user: User) {
    const payload = {
      _id: user._id,
      phoneNumber: user.phoneNumber,
      userName: user.userName,
      userRole: user.userRole,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
}
