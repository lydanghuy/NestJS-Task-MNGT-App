import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDTO: GetTaskFilterDto): Task[] {
        if(Object.keys(filterDTO).length) {
            return this.taskService.getTaskWithFilters(filterDTO);
        } else {
            return this.taskService.getAllTasks();
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body()  createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        console.log("ga");
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Task {
        return this.taskService.updateTaskStatus(id, status);
    }

}
