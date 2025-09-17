import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: "Kategoriya nomi kamida 2 ta belgidan iborat bo'lishi kerak",
  })
  title: string;
}
