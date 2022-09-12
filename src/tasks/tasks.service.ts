import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>
    ) {}

    // getAllTasks() : Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilter(filterDto : GetTasksFilterDto) : Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();
    //     if(status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if(search) {
    //         tasks = tasks.filter(task => 
    //             task.title.includes(search) ||
    //             task.description.includes(search)    
    //         );
    //     }
    //     return tasks;
    // }

    // getTaskById(id : string) : Task {
    //     const found = this.tasks.find(task => task.id == id);
    //     if(!found) {
    //         throw new NotFoundException(`Task with ID "${id}" not found`);
    //     }
    //     return found;
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOneBy({id});

        if(!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }

    // createTask(createTaskDto: CreateTaskDto) : Task {
    //     const { title, description } = createTaskDto;

    //     const task : Task = {
    //         id: v1(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);

    //     return task;
    // }

    // updateTaskStatus(id : string, status : TaskStatus) : Task {
    //     const task : Task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    // deleteTask(id : string) : void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }
}
