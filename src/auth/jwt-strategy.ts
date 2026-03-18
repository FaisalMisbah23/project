import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthPayload } from "./types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // JWT secret match between signing and strategy validation
            secretOrKey: process.env.JWT_SECRET || 'default-secret',
        })
    }

    async validate(payload: AuthPayload) {
        return { userId: payload.sub, email: payload.email, artistId: payload.artistId };
    }
}