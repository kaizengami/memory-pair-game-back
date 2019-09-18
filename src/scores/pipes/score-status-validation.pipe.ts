import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ScoreStatus } from '../score-status.enum';

export class ScoreStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ScoreStatus.EASY,
    ScoreStatus.NORMAL,
    ScoreStatus.HARD,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
