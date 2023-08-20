import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainController } from './main/main.controller';
import { TasksController } from './tasks/tasks.controller';
import { TaskService } from './services/tasks.service';

import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, MainController, TasksController, UserController],
  providers: [AppService, TaskService],
})
export class AppModule { }
