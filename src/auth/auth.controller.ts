import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-guard';
import { Enable2FAType } from './types';
import { ValidateTokenDTO } from './dto/validate-token';
import { ApiKeyAuthGuard } from './api-key-guard';

@Controller('auth')
export class AuthController {
    constructor(private userService: UsersService
        , private authService: AuthService
    ) { }
    @Post("signup")
    signup(@Body() userDTO: CreateUserDTO): Promise<Omit<User, 'password'>> {
        return this.userService.createUser(userDTO);

    }

    @Post("login")
    login(@Body() loginDTO: LoginDTO) {
        return this.authService.loginUser(loginDTO)
    }

    @Get("profile")
    @UseGuards(JwtAuthGuard)
    getProfile(
        @Req() request
    ) {

        return request.user
    }

    @Get("enable-2fa")
    @UseGuards(JwtAuthGuard)
    enable2FA(
        @Req() request
    ): Promise<Enable2FAType> {
        return this.authService.enable2FA(request.user.userId)
    }

    @Post("validate-2fa")
    @UseGuards(JwtAuthGuard)
    validate2FA(
        @Req() request,
        @Body() validateTokenDTO: ValidateTokenDTO,

    ): Promise<{ verified: boolean }> {
        return this.authService.validate2FAToken(request.user.userId, validateTokenDTO.token)
    }

    // this route is used to disable 2FA for a user, it is protected by the JwtAuthGuard to ensure that only authenticated users can access it
    @Get("disable-2fa")
    @UseGuards(JwtAuthGuard)
    disable2FA(
        @Req() request
    ) {
        return this.authService.disable2FA(request.user.userId)
    }

    // this route is used to get the user profile for a user authenticated with the api key strategy, it is protected by the ApiKeyGuard to ensure that only users with a valid api key can access it
    @Get("profile-api-key")
    @UseGuards(ApiKeyAuthGuard)
    getUserProfile(
        @Req() request
    ) {
        const { password, ...userWithoutPassword } = request.user;
        return {
            message: "authenticated with api key strategy",
            user: userWithoutPassword
        }
    }


}
