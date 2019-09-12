import { ScoreStatus } from '../score-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetScoresFilterDto {
  @IsOptional()
  @IsIn([ScoreStatus.OPEN, ScoreStatus.IN_PROGRESS, ScoreStatus.DONE])
  status: ScoreStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
