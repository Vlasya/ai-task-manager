import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthRequest } from '../auth/types/auth-request.interface';
import { UpdateTaskDto, CreateTaskDto } from './dto/task.dto';
import { TaskStatus } from '@prisma/client';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAllTasks(
    @Req() req: AuthRequest,
    @Query('status') status?: TaskStatus,
    @Query('page') page: number = 1,
    @Query('limit') limit = 10,
  ) {
    return this.taskService.getAllTasks(req.user!.id, status, page, limit);
  }

  @Get(':id')
  getTaskById(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.taskService.getTaskById(id, req.user!.id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createTask(@Req() req: AuthRequest, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(req.user!.id, createTaskDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateTask(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, updateTaskDto, req.user!.id);
  }

  @Delete(':id')
  deleteTask(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.taskService.deleteTask(id, req.user!.id);
  }
}
