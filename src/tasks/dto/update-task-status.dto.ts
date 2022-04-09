import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status';

export class UpdateTaskStatusDTO {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
