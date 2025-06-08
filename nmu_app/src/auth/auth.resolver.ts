import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { GqlContext } from 'src/common/types/ctx';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthResponse } from './model/auth-response.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async register(@Args('input') input: RegisterInput) {
    return await this.authService.register(input);
  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput, @Context() ctx: GqlContext) {
    return await this.authService.login(input, ctx);
  }

  @Mutation(() => AuthResponse)
  async refreshTokens(@Context() ctx: GqlContext) {
    return this.authService.refreshTokensFromCookie(ctx);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async logout(@Args('userId') userId: string, @Context() ctx: GqlContext) {
    await this.authService.logout(userId);
    ctx.res.clearCookie('refreshToken', { path: '/' });
    return true;
  }
}
