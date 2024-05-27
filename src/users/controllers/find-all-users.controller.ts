import { Controller, Get } from '@nestjs/common';
import { FindAllUsersService } from '../services/find-all-users.service';

@Controller('users')
export class FindAllUsersController {
    constructor(private readonly service: FindAllUsersService) {}

    @Get()
    handle() {
        return this.service.execute();
    }
}
