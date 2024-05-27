import { Controller, Post, Body, HttpCode, UsePipes } from '@nestjs/common';
import { CreateUserService } from '../services/create-user.service';
import { CreateUserDto, createUserSchema } from '../dto/create-user.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('users')
export class CreateUserController {
    constructor(private readonly service: CreateUserService) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createUserSchema))
    handle(@Body() createUserDto: CreateUserDto) {
        return this.service.execute(createUserDto);
    }
}
