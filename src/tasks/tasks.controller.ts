import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req, HttpStatus, Query, ParseBoolPipe, ParseUUIDPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: any, @Body() createDto: CreateTaskDto) {
    const user = req.user;
    return this.tasksService.create(createDto, user.id);
  }

  @Get()
  async findAll(
    @Req() req: any,
    @Query('completed', new ParseBoolPipe({ optional: true })) completed?: boolean,
  ) {
    const user = req.user; // provisto por JwtStrategy -> { id, username }
    return this.tasksService.findAllForUser(user.id, completed);
  }

  @Get(':id')
  async findOne(@Req() req: any, @Param('id', new ParseUUIDPipe()) id: string) {
    const user = req.user;
    return this.tasksService.findOneForUser(id, user.id);
  }
}
