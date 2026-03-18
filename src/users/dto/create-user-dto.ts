import { IsEmail, isNotEmpty, IsNotEmpty, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}