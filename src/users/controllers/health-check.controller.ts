import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('/healthcheck')
export class HealthCheckController {
    @Get()
    @HttpCode(200)
    async handle() {}
}
