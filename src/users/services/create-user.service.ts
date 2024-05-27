import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from '../repository/user.repository';
import { hash } from 'bcryptjs';

@Injectable()
export class CreateUserService {
    constructor(
        private prisma: PrismaService,
        private userRepository: UserRepository,
    ) {}

    async execute(createUserDto: CreateUserDto) {
        const { name, email, password } = createUserDto;
        const emailExists = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (emailExists) {
            throw new ConflictException('Email already exists');
        }

        const passwordHash = await hash(password, 8);

        await this.userRepository.create({
            name,
            email,
            password: passwordHash,
        });
    }
}
