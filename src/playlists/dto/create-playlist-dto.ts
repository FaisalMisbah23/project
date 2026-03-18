import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class CreatePlaylistDTO {

    @IsString()
    @IsNotEmpty()
    readonly name;

    @IsArray()
    @IsNumber({},{each:true})
    @IsNotEmpty()
    readonly songs

    @IsNumber()
    @IsNotEmpty()
    readonly user: number
}