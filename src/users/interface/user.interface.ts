import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface UserInterface {
    create(data: CreateUserDto): Promise<void>;
    update(id: string, data: UpdateUserDto): Promise<User | null>;
    findOne(id: string): Promise<User | null>;
    delete(id: string): Promise<User>;
}
