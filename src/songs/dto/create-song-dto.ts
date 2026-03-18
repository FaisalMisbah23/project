import { IsArray, IsDate, IsDateString, IsMilitaryTime, IsNotEmpty, IsNotIn, IsNumber, IsOptional, isString, IsString, Min, MinDate } from "class-validator";

export class CreateSongDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({},{ each: true })
    readonly artists: string[];

    @IsNotEmpty()
    @IsDateString()
    readonly releasedDate: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string


}