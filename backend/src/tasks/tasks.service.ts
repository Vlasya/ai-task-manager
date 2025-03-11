import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Task, TaskStatus } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(
    userId: string,
    status?: TaskStatus,
    title?: string,
    sort: 'asc' | 'desc' = 'desc',
    page: number = 1,
    limit: number = 10,
  ): Promise<{ tasks: Task[]; total: number }> {
    const where = {
      userId,
      ...(status ? { status } : {}),
      ...(title
        ? { title: { contains: title, mode: Prisma.QueryMode.insensitive } }
        : {}),
    };

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: sort },
      }),
      this.prisma.task.count({ where }),
    ]);
    return { tasks, total };
  }

  async getTaskById(id: string, userId: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task was not found');
    }
    if (task.userId !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }
    return task;
  }

  async createTask(
    userId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: TaskStatus.TODO,
        user: { connect: { id: userId } },
      },
    });
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    const task = await this.getTaskById(id, userId);

    if (!task) {
      throw new ForbiddenException('You do not have access to this task');
    }

    return this.prisma.task.update({
      where: { id },
      data: { ...updateTaskDto },
    });
  }

  async deleteTask(id: string, userId: string): Promise<void> {
    const task = await this.getTaskById(id, userId);

    if (!task) {
      throw new ForbiddenException('You do not have access to this task');
    }
    await this.prisma.task.delete({ where: { id } });
  }
}
