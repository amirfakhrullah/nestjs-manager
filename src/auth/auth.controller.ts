import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCreds: AuthCredentialsDTO): Promise<void> {
    return this.authService.signUp(authCreds);
  }

  @Post('/signin')
  signIn(
    @Body() authCreds: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCreds);
  }
}
