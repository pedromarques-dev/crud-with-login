import { Controller, Get, Param } from '@nestjs/common';
import { FindOneUserService } from '../services/find-one-user.service';
import { z } from 'zod';

const findOneUserParamsSchema = z.object({
    id: z.string().uuid(),
});

type FindOneUserParamsSchema = z.infer<typeof findOneUserParamsSchema>;

@Controller('users')
export class FindOneUserController {
    constructor(private readonly service: FindOneUserService) {}

    @Get('/:id')
    handle(@Param() { id }: FindOneUserParamsSchema) {
        return this.service.execute(id);
    }
}
