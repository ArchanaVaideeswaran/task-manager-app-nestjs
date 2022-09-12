import { Controller, Get, Post, Delete, Patch, Body, Param, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidtationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from "./task-status.enum";
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService : TasksService) {}

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto : GetTasksFilterDto) : Task[] {
    //     if(Object.keys(filterDto).length) {
    //         return this.taskService.getTasksWithFilter(filterDto);
    //     }
    //     return this.taskService.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id : number) : Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(
    //     @Body() createTaskDto : CreateTaskDto) : Task {
    //     return this.taskService.createTask(createTaskDto);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id : string, 
    //     @Body('status', TaskStatusValidtationPipe) status : TaskStatus) : Task {
    //     return this.taskService.updateTaskStatus(id, status);
    // }

    // @Delete('/:id')
    // deleteTask(@Param('id') id : string) : void {
    //     this.taskService.deleteTask(id);
    // }
}
