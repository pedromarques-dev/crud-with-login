import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserInterface } from '../interface/user.interface';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository implements UserInterface {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        const { name, email, password } = data;

        await this.prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
    }

    async findAll() {
        const users = await this.prisma.user.findMany();

        return users;
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    }

    async update(id: string, data: UpdateUserDto) {
        const updatedUser = await this.prisma.user.update({
            where: {
                id,
            },
            data: { ...data },
        });

        return updatedUser;
    }

    async delete(id: string) {
        const deletedUser = await this.prisma.user.delete({
            where: {
                id,
            },
        });

        return deletedUser;
    }
}
