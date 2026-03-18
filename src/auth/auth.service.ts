import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { AuthPayload, Enable2FAType } from './types';
import speakeasy from "speakeasy";
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private artistService: ArtistsService
    ) { }

    async loginUser(loginDTO: LoginDTO): Promise<{ accessToken: string } | { validate2FA: string, message: string }> {
        const user = await this.userService.findOne(loginDTO);
        const passwordMatched = await bcrypt.compare(loginDTO.password, user.password)

        if (!passwordMatched) {
            throw new UnauthorizedException("Invalid credentials provided for login attempt.");
        }

        const payload: AuthPayload = { email: user.email, sub: user.id }
        const artist = await this.artistService.findArtist(user.id)
        if (artist) {
            payload.artistId = artist.id
        }

        if (user.enabled2FA && user.twoFASecret) {
            return {
                validate2FA: "http://localhost:3000/auth/validate-2fa",
                message: "Please send the one time password/token from your google authenticator app"
            }
        }

        return { accessToken: this.jwtService.sign(payload) }
    }

    async enable2FA(userId: number): Promise<Enable2FAType> {
        const user = await this.userService.findById(userId);
        if (user.enabled2FA && user.twoFASecret) {
            return { secret: user.twoFASecret }
        }
        const secret = speakeasy.generateSecret();
        user.twoFASecret = secret.base32;
        await this.userService.updateSecretKey(user.id, user.twoFASecret);
        return { secret: user.twoFASecret }
    }

    async validate2FAToken(userId: number, token: string): Promise<{ verified: boolean }> {
        try {
            // find the user based on the id 
            const user = await this.userService.findById(userId);

            if (!user.twoFASecret) {
                return { verified: false }
            }

            // extract his 2fa secret key and verify the token with the secret key
            const verified = speakeasy.totp.verify({
                secret: user.twoFASecret,
                encoding: 'base32',
                token
            });

            if (verified) {
                return { verified: true };
            } else {
                return { verified: false };
            }
        } catch (error) {
            throw new UnauthorizedException("Invalid 2FA token provided.");
        }
    }

    async disable2FA(userId: number): Promise<UpdateResult> {
        return this.userService.disable2FA(userId);
    }

    async validateApiKey(apiKey: string) {
        const user = await this.userService.findOneByApiKey(apiKey);
        return user;
    }
}
