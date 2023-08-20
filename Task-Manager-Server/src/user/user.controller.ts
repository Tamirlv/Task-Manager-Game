import { Controller, Get } from '@nestjs/common';
import { User } from 'src/models/userModel';
import { TaskService } from 'src/services/tasks.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly tasksService: TaskService
    ) {

    }
    @Get()

    getTasks(): User {
        const user = this.tasksService.getUser();
        return user;
    }

}