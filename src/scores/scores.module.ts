import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreRepository } from './score.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ScoreRepository]), AuthModule],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class TasksModule {}
