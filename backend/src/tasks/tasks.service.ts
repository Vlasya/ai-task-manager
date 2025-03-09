import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task, TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async createTask(
    userId: string,
    title: string,
    description: string = '',
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title,
        description,
        status: TaskStatus.TODO,
        user: { connect: { id: userId } },
      },
    });
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }

  async deleteTask(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}
