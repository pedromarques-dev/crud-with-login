import { Controller, Body, Patch, Param } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserService } from '../services/update-user.service';
import { z } from 'zod';

const updateUserParamsSchema = z.object({
    id: z.string().uuid(),
});

type UpdateUserParamsSchema = z.infer<typeof updateUserParamsSchema>;

@Controller('users')
export class UpdateUserController {
    constructor(private readonly service: UpdateUserService) {}

    @Patch('/:id')
    handle(
        @Body() updateUserDto: UpdateUserDto,
        @Param() { id }: UpdateUserParamsSchema,
    ) {
        return this.service.execute(id, updateUserDto);
    }
}
