import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserService } from './services/create-user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from './repository/user.repository';
import { FindAllUsersController } from './controllers/find-all-users.controller';
import { FindAllUsersService } from './services/find-all-users.service';
import { FindOneUserService } from './services/find-one-user.service';
import { FindOneUserController } from './controllers/find-one-user.controller';
import { UpdateUserService } from './services/update-user.service';
import { UpdateUserController } from './controllers/update-user.controller';
import { DeleteUserService } from './services/delete-user.service';
import { DeleteUserController } from './controllers/delete-user.controller';

@Module({
    controllers: [
        CreateUserController,
        FindAllUsersController,
        FindOneUserController,
        UpdateUserController,
        DeleteUserController,
    ],
    providers: [
        PrismaService,
        UserRepository,
        CreateUserService,
        FindAllUsersService,
        FindOneUserService,
        UpdateUserService,
        DeleteUserService,
    ],
})
export class UsersModule {}
