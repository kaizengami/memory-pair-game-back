import { Score } from './score.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateScoreDto } from './dto/create-score.dto';
import { ScoreStatus } from './score-status.enum';
import { GetScoresFilterDto } from './dto/get-scores-filter.dto';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Score)
export class ScoreRepository extends Repository<Score> {
  private logger = new Logger('ScoreRepository');

  async getScores(filterDto: GetScoresFilterDto, user: User): Promise<Score[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('score');

    query.where('score.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('score.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(score.title LIKE :search OR score.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const scores = await query.getMany();
      return scores;
    } catch (error) {
      this.logger.error(
        `Failed to get scores for user "${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createScore(
    createScoreDto: CreateScoreDto,
    user: User,
  ): Promise<Score> {
    const { name, time, points } = createScoreDto;

    const score = new Score();
    score.name = name;
    score.time = time;
    score.points = points;
    score.status = ScoreStatus.NORMAL;
    score.user = user;

    try {
      await score.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a score for user "${user.username}". Data: ${createScoreDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete score.user;
    return score;
  }
}
