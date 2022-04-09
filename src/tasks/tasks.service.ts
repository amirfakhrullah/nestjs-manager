import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id} doesn't exist!`);
    }

    return found;
  }

  createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO);
  }
}
