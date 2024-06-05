import { Controller, Body, Patch, Param, UsePipes } from '@nestjs/common';
import { UpdateUserDto, updateUserSchema } from '../dto/update-user.dto';
import { UpdateUserService } from '../services/update-user.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

const updateUserParamsSchema = z.object({
    id: z.string().uuid(),
});

type UpdateUserParamsSchema = z.infer<typeof updateUserParamsSchema>;

@Controller('users')
export class UpdateUserController {
    constructor(private readonly service: UpdateUserService) {}

    @Patch('/:id')
    @UsePipes(new ZodValidationPipe(updateUserSchema))
    handle(
        @Body() updateUserDto: UpdateUserDto,
        @Param() { id }: UpdateUserParamsSchema,
    ) {
        return this.service.execute(id, updateUserDto);
    }
}
