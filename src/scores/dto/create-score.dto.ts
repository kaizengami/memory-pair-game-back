import { IsNotEmpty } from 'class-validator';

export class CreateScoreDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  points: number;
}
