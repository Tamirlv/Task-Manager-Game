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
        // Validate that all required fields exist
        if (task.difficultyLevel && task.dueDate && task.pointValue && task.title) {
            return this.tasksService.createTask(task);
        }
    }

    @Get()
    getTasks(): Task[] {
        // Getting all tasks
        const tasks = this.tasksService.getAllTasks();
        return tasks.reverse();
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        // Deletes the task by task id
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
        // Validate that all required fields exist
        if (task.difficultyLevel && task.dueDate && task.pointValue && task.title && task.id) {
            const updated = this.tasksService.updateTask(task)
            return { message: updated };
        }
    }

    @Post('/complete/:id')
    completeTask(@Param('id') id: string) {
        // Complte a task and getting new user score and level
        const user = this.tasksService.completeTask(id);
        return user;
    }

}