import { Controller, Get, Post, Put, Delete, Param, NotFoundException, Body } from '@nestjs/common';
import { Task } from 'src/models/taskModel';
import { TaskService } from 'src/services/tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TaskService
    ) { }

    @Post()
    createTask(@Body() task: Task) {

        // TODO validation


        return this.tasksService.createTask(task);
    }

    @Get()
    getTasks(): Task[] {
        const tasks = this.tasksService.getAllTasks();
        return tasks;
    }

    @Delete('/:id')

    deleteTask(@Param('id') id: string) {
        const deleted = this.tasksService.deleteTask(id);
        if (deleted) {
            return {
                message: 'Task deleted successfully',
            };
        }
        throw new NotFoundException(`Task with ID ${id} not found`);
    }

    @Put()
    updateTask(@Body() task: Task): { message: any } {
        const updated = this.tasksService.updateTask(task)
        return { message: updated };
    }

    @Post('/complete/:id')
    completeTask(@Param('id') id: string) {
        const user = this.tasksService.completeTask(id);
        return user;
        // // if (completedTask) {
        // return {
        //     message: completedTask
        // }
        // // };
    }

}