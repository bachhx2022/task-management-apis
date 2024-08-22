import {
  NotFoundResourceException,
  OkResponseDto,
  PaginationResponse,
  TaskEntity,
  TaskRepository,
} from '@app/libs';
import { Injectable } from '@nestjs/common';
import { ContextService } from '../common/context.service';
import { EntityManager, FilterQuery } from '@mikro-orm/postgresql';
import {
  CreateTaskRequest,
  SearchTasksRequest,
  SetCompleteTaskRequest,
  UpdateTaskRequest,
} from './dtos';

@Injectable()
export class TasksService {
  constructor(
    private readonly em: EntityManager,
    private readonly taskRepo: TaskRepository,
    private readonly ctx: ContextService,
  ) {}

  async search(queryParams: SearchTasksRequest) {
    const filter: FilterQuery<TaskEntity> = {
      ...(queryParams.query && {
        title: {
          $ilike: `%${queryParams.query}%`,
        },
      }),
      // non-strict equality check
      ...(queryParams.isCompleted != null && {
        isCompleted: queryParams.isCompleted,
      }),
      createdBy: this.ctx.userId,
    };

    const [tasks, total] = await Promise.all([
      this.taskRepo.find(filter, {
        offset: queryParams.offset(),
        limit: queryParams.limit(),
        orderBy: queryParams.sortFields(),
      }),
      this.taskRepo.count(filter),
    ]);

    return new PaginationResponse(tasks, {
      page: queryParams.page,
      take: queryParams.take,
      itemCount: total,
    });
  }

  async detail(id: string) {
    const task = await this.taskRepo.findOne({
      id,
      createdBy: this.ctx.userId,
    });

    if (!task) {
      throw new NotFoundResourceException(`Task with Id ${id} not found.`);
    }

    return new OkResponseDto(task);
  }

  async create(request: CreateTaskRequest) {
    const task = this.taskRepo.create({
      title: request.title,
      description: request.description,
      createdBy: this.ctx.userId,
      updatedBy: this.ctx.userId,
    });

    await this.taskRepo.persistAndFlush(task);

    return new OkResponseDto({ id: task.id });
  }

  async update(id: string, request: UpdateTaskRequest) {
    const task = await this.taskRepo.findOne({
      id,
      createdBy: this.ctx.userId,
    });

    if (!task) {
      throw new NotFoundResourceException(`Task with Id ${id} not found.`);
    }

    task.title = request.title;
    task.description = request.description;

    await this.taskRepo.flush();

    return new OkResponseDto({ id: task.id });
  }

  async setComplete(id: string, request: SetCompleteTaskRequest) {
    const task = await this.taskRepo.findOne({
      id,
      createdBy: this.ctx.userId,
    });

    if (!task) {
      throw new NotFoundResourceException(`Task with Id ${id} not found.`);
    }

    task.isCompleted = request.isCompleted;

    await this.taskRepo.flush();

    return new OkResponseDto({ id: task.id });
  }


  async delete(id: string) {
    const task = await this.taskRepo.findOne({
      id,
      createdBy: this.ctx.userId,
    });

    if (!task) {
      throw new NotFoundResourceException(`Task with Id ${id} not found.`);
    }

    await this.taskRepo.removeAndFlush(task);

    return new OkResponseDto({ id: task.id });
  }
}
