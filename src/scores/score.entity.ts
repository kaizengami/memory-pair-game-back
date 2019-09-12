import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { ScoreStatus } from './score-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Score extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  time: string;

  @Column()
  points: number;

  @Column()
  status: ScoreStatus;

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User;

  @Column()
  userId: number;
}
