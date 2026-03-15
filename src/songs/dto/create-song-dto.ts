import { IsArray, IsDate, IsMilitaryTime, IsNotEmpty, IsNotIn, IsString, Min, MinDate } from "class-validator";

export class CreateSongDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: String;

    @IsNotEmpty()
    @IsArray()
    readonly artists: string[];

    @IsNotEmpty()
    readonly releasedData: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: Date;
}