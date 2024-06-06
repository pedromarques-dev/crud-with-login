import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class FindOneUserService {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string) {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return {
            ...user,
            password: undefined,
        };
    }
}
