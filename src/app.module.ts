import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
    ],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
