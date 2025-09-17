import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  @MinLength(2, {
    message: "Kategoriya nomi kamida 2 ta belgidan iborat bo'lishi kerak",
  })
  title?: string;
}
