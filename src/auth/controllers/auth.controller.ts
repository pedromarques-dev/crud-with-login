import { Controller, Post, Body } from '@nestjs/common';
import { AuthBodySchema, AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post()
    handle(@Body() body: AuthBodySchema) {
        return this.service.execute(body);
    }
}
