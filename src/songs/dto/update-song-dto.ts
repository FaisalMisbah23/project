import { IsArray, IsDate, IsDateString, IsMilitaryTime, IsNotEmpty, IsNotIn, IsOptional, isString, IsString, Min, MinDate } from "class-validator";

export class UpdateSongDTO {
    @IsString()
    @IsOptional()
    readonly title: string;


    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    readonly artists: string[];

    @IsDateString()
    @IsOptional()
    readonly releasedData: Date;

    @IsMilitaryTime()
    @IsOptional()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string


}