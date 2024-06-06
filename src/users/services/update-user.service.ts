import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from '../repository/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserService {
    constructor(
        private prisma: PrismaService,
        private userRepository: UserRepository,
    ) {}

    async execute(id: string, updateUserDto: UpdateUserDto) {
        const { name, email } = updateUserDto;
        const userExists = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!userExists) {
            throw new NotFoundException('User not found.');
        }

        const userWithSameEmail = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userWithSameEmail && userWithSameEmail.email !== userExists.email) {
            throw new ConflictException('Email already exists.');
        }

        const user = await this.userRepository.update(id, {
            name,
            email,
        });

        return {
            ...user,
            password: undefined,
        };
    }
}
