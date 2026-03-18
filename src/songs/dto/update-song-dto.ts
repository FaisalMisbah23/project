import { IsArray, IsDate, IsDateString, IsMilitaryTime, IsNotEmpty, IsNotIn, IsNumber, IsOptional, isString, IsString, Min, MinDate } from "class-validator";

export class UpdateSongDTO {
    @IsString()
    @IsOptional()
    readonly title: string;


    @IsArray()
    @IsNumber({},{ each: true })
    @IsOptional()
    readonly artists: string[];

    @IsDateString()
    @IsOptional()
    readonly releasedDate: Date;

    @IsMilitaryTime()
    @IsOptional()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string


}