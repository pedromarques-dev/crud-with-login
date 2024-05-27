import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

const payloadSchema = z.object({
    sub: z.string().uuid(),
});

export type PayloadSchema = z.infer<typeof payloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: PayloadSchema) {
        return { userId: payload.sub };
    }
}
