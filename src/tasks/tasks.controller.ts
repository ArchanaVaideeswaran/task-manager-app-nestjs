import { Controller, Get, Post, Delete, Patch, Body, Param, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidtationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from "./task-status.enum";
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { userInfo } from 'os';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService : TasksService) {}

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto : GetTasksFilterDto,
        @GetUser() user: User
    ) : Promise<Task[]> {
        return this.taskService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id : number,
        @GetUser() user: User
    ) : Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto : CreateTaskDto,
        @GetUser() user: User
    ) : Promise<Task> {
        return this.taskService.createTask(createTaskDto, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id : number, 
        @Body('status', TaskStatusValidtationPipe) status : TaskStatus,
        @GetUser() user: User
    ) : Promise<Task> {
        return this.taskService.updateTaskStatus(id, status, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id : number,
        @GetUser() user: User
    ) : Promise<void> {
        return this.taskService.deleteTask(id, user);
    }
}
