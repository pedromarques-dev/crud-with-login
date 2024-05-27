import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { DeleteUserService } from '../services/delete-user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

const deleteUserParamsSchema = z.object({
    id: z.string().uuid(),
});

type DeleteUserParamsSchema = z.infer<typeof deleteUserParamsSchema>;

@Controller('users')
@UseGuards(JwtAuthGuard)
export class DeleteUserController {
    constructor(private readonly service: DeleteUserService) {}

    @Delete('/:id')
    @HttpCode(204)
    handle(@Param() { id }: DeleteUserParamsSchema) {
        return this.service.execute(id);
    }
}
