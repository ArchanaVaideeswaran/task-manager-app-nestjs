import { Injectable } from '@nestjs/common';
import { v1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks() : Task[] {
        return this.tasks;
    }

    getTasksWithFilter(filterDto : GetTasksFilterDto) : Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if(search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search)    
            );
        }
        return tasks;
    }

    getTaskById(id : string) : Task {
        return this.tasks.find(task => task.id == id);
    }

    createTask(createTaskDto: CreateTaskDto) : Task {
        const { title, description } = createTaskDto;

        const task : Task = {
            id: v1(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }

    updateTaskStatus(id : string, status : TaskStatus) : Task {
        const task : Task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    deleteTask(id : string) : void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}