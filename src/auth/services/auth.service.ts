import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { JwtService } from '@nestjs/jwt';

const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type AuthBodySchema = z.infer<typeof authBodySchema>;

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async execute(payload: AuthBodySchema) {
        const { email, password } = payload;
        const userExists = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!userExists) {
            throw new BadRequestException('Credentials Not Valid.');
        }

        const passwordHash = await compare(password, userExists.password);

        if (!passwordHash) {
            throw new BadRequestException('Credentials Not Valid.');
        }

        const tokenPayload = { sub: userExists.id };

        return {
            access_token: await this.jwtService.signAsync(tokenPayload),
        };
    }
}
