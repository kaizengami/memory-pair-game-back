import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { GetScoresFilterDto } from './dto/get-scores-filter.dto';
import { ScoreRepository } from './score.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { ScoreStatus } from './score-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(ScoreRepository)
    private scoreRepository: ScoreRepository,
  ) {}

  async getScores(filterDto: GetScoresFilterDto, user: User): Promise<Score[]> {
    return this.scoreRepository.getScores(filterDto, user);
  }

  async getScoreById(id: number, user: User): Promise<Score> {
    const found = await this.scoreRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Score with ID "${id}" not found`);
    }

    return found;
  }

  async createScore(
    createScoreDto: CreateScoreDto,
    user: User,
  ): Promise<Score> {
    return this.scoreRepository.createScore(createScoreDto, user);
  }

  async deleteScore(id: number, user: User): Promise<void> {
    const result = await this.scoreRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Score with ID "${id}" not found`);
    }
  }

  async updateScoreStatus(
    id: number,
    status: ScoreStatus,
    user: User,
  ): Promise<Score> {
    const score = await this.getScoreById(id, user);
    score.status = status;
    await score.save();
    return score;
  }
}
