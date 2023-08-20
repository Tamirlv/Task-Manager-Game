import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task } from 'src/models/taskModel';
import { User } from 'src/models/userModel';
import dbTasks from 'src/tasks/tasks';
@Injectable()
export class TaskService {

    constructor() {
        this.initTasks();
    }

    initTasks() {
        dbTasks.forEach(t => this.createTask(t));
    }

    private tasks: { [key: string]: Task } = {}


    private user: User = {
        level: 1,
        score: 0
    }


    createTask(task: Task) {
        // Logic to create a task and add it to the array
        const newId = uuidv4();
        this.tasks[newId] = { ...task, id: newId };
        return task;
    }

    getAllTasks(): Task[] {
        return Object.values(this.tasks);
    }

    deleteTask(id: string): boolean {
        if (!this.tasks[id])
            return false;
        delete this.tasks[id];
        return true;
    }


    updateTask(task: Task): Task {
        this.tasks[task.id] = task;
        return task;
    }

    completeTask(id: string) {
        const currentTask = this.tasks[id];
        currentTask.completed = true
        this.user.score += currentTask.pointValue;
        this.user.level = Math.ceil(this.user.score / (parseInt(process.env.SCORE_PER_LEVEL || '75')));
        return {
            user: this.user
        }
    }

    getUser() {
        return this.user;
    }
}
