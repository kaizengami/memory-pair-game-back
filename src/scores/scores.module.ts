import { Module } from '@nestjs/common';
import { TasksController } from './scores.controller';
import { TasksService } from './scores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './score.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
