import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import bcrypt from 'bcryptjs';
import { LoginDTO } from 'src/auth/dto/login-dto';
import { v4 as uuid4 } from "uuid";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    // this method is used to create a new user and hash their password before saving to the database
    async createUser(userDTO: CreateUserDTO): Promise<Omit<User, "password">> {
        const apiKey = uuid4();

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(userDTO.password, salt)


        const savedUser = await this.userRepository.save({
            ...userDTO,
            password: hashedPassword,
            apiKey,
        })

        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;

    }

    // this method is used to find a user by their email for the login process
    async findOne(data: LoginDTO): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email: data.email } })
        if (!user) {
            throw new UnauthorizedException("Could not find user")
        }
        return user;
    }

    // this method is used to find a user by their id for the profile route and other places where we need to find a user by their id
    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) {
            throw new UnauthorizedException("Could not find user")
        }
        return user;
    }

    // this method is used to update the 2FA secret key for a user and enable 2FA for that user
    async updateSecretKey(userId: number, secretKey: string): Promise<UpdateResult> {
        return await this.userRepository.update({ id: userId }, { twoFASecret: secretKey, enabled2FA: true })
    }

    // this method is used to disable 2FA for a user by setting the 2FA secret key to null and enabled2FA to false
    async disable2FA(userId: number): Promise<UpdateResult> {
        return await this.userRepository.update({ id: userId }, { twoFASecret: null, enabled2FA: false })
    }

    // this method is used to find a user by their api key for the api key strategy
    async findOneByApiKey(apiKey: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { apiKey } })
        return user;
    }
}
