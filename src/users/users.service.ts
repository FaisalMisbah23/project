import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async createUser(userDTO: CreateUserDTO): Promise<Omit<User, "password">> {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(userDTO.password, salt)


        const savedUser = await this.userRepository.save({
            ...userDTO,
            password: hashedPassword,
        })

        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;

    }

}
