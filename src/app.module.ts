import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { HealthCheckController } from './users/controllers/health-check.controller';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
    ],
    controllers: [HealthCheckController],
    providers: [PrismaService],
})
export class AppModule {}
