export interface AuthPayload {
    email: string,
    sub: number,
    artistId?: number
}

export type Enable2FAType = {
    secret: string,
}