import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { ScoreStatusValidationPipe } from './pipes/score-status-validation.pipe';
import { GetScoresFilterDto } from './dto/get-scores-filter.dto';
import { Score } from './score.entity';
import { ScoreStatus } from './score-status.enum';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class ScoresController {
  private logger = new Logger('ScoresController');

  constructor(private scoresService: ScoresService) {}

  @Get()
  getScores(
    @Query(ValidationPipe) filterDto: GetScoresFilterDto,
    @GetUser() user: User,
  ): Promise<Score[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all scores. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.scoresService.getScores(filterDto, user);
  }

  @Get('/:id')
  getScoreById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Score> {
    return this.scoresService.getScoreById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createScore(
    @Body() createScoreDto: CreateScoreDto,
    @GetUser() user: User,
  ): Promise<Score> {
    this.logger.verbose(
      `User "${user.username}" creating a new score. Data: ${JSON.stringify(
        createScoreDto,
      )}`,
    );
    return this.scoresService.createScore(createScoreDto, user);
  }

  @Delete('/:id')
  deleteScore(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.scoresService.deleteScore(id, user);
  }

  @Patch('/:id/status')
  updateScoreStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ScoreStatusValidationPipe) status: ScoreStatus,
    @GetUser() user: User,
  ): Promise<Score> {
    return this.scoresService.updateScoreStatus(id, status, user);
  }
}
