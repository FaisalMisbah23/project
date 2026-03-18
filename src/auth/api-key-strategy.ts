import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, "api-key") {
    constructor(
        private authService: AuthService
    ) {
        super()
    }

    async validate(apiKey: string) {
        const user = await this.authService.validateApiKey(apiKey);
        if (!user) {
            throw new UnauthorizedException("Invalid API key provided.");
        } else {
            return user;
        }
    }

}