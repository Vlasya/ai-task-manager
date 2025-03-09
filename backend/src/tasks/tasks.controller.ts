import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() body: { userId: string; title: string; description?: string },
  ) {
    return this.taskService.createTask(
      body.userId,
      body.title,
      body.description ?? '',
    );
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.taskService.updateTask(id, status);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
