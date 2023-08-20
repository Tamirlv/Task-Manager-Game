import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task } from 'src/models/taskModel';
import { User } from 'src/models/userModel';
import dbTasks from 'src/tasks/tasks';
@Injectable()
export class TaskService {

    // Creating tasks object with a id as a key and value as a Task
    private tasks: { [key: string]: Task } = {}

    // Creating user object
    private user: User = {
        level: 1,
        score: 0
    }

    constructor() {
        // Execute initTasks function
        this.initTasks();
    }

    initTasks() {
        // Looping on all of the static tasks and add to the tasks object
        dbTasks.forEach(t => this.createTask(t));
    }

    createTask(task: Task) {
        // Logic to create a task and add it to the array
        const newId = uuidv4(); // Creating a new uuid
        this.tasks[newId] = { ...task, id: newId }; // updating the id to uuid
        return task;
    }

    getAllTasks(): Task[] {
        // Getting all tasks
        return Object.values(this.tasks);
    }

    deleteTask(id: string): boolean {
        // Deleting task
        if (!this.tasks[id]) // Validate that task exist
            return false;
        delete this.tasks[id]; //Delete task
        return true;
    }


    updateTask(task: Task): Task {
        task.completed = this.tasks[task.id].completed; // Completed stays as before
        this.tasks[task.id] = task; // Updating the current task 
        return task;
    }

    completeTask(id: string) {
        // Completing task
        const currentTask = this.tasks[id]; // Getting the task
        currentTask.completed = true // Change the completed to true
        this.user.score += currentTask.pointValue; // Sum the new user score
        this.user.level = Math.ceil(this.user.score / (parseInt(process.env.SCORE_PER_LEVEL || '75'))); // Calculate the new user level
        return {
            user: this.user
        }
    }

    getUser() {
        // Return user data
        return this.user;
    }
}
