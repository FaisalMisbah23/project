import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

export class ArtistsJwtAuthGuard extends AuthGuard("jwt"){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (err || !user) {
            throw err || new UnauthorizedException("Unauthorized access - invalid or missing token.");
        }if(user.artistId){
            return user
        }else{
            throw new UnauthorizedException("User is not an artist - access denied.");
    }
}}