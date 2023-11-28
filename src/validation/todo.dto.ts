import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TodoCreateDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;
}
