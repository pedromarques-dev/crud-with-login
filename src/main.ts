import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './env/env';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configSevice = app.get<ConfigService<Env, true>>(ConfigService);

    const port = configSevice.get('PORT', { infer: true });

    await app.listen(port);
}
bootstrap();
