import { Visibility } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsNumber()
  @Type(() => Number)
  duration: number;

  @IsEnum(Visibility)
  @IsOptional()
  visibility: Visibility;
}
