import { ScoreStatus } from '../score-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetScoresFilterDto {
  @IsOptional()
  @IsIn([ScoreStatus.EASY, ScoreStatus.NORMAL, ScoreStatus.HARD])
  status: ScoreStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
