import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly usersService: UsersService,
  ) { }
  async create(createDto: CreateTaskDto, userId: string): Promise<Task> {
    const user = await this.usersService.findById(userId);
    const task = this.tasksRepository.create({
      ...createDto,
      user,
    });
    return this.tasksRepository.save(task);
  }

  async findAllForUser(userId: string, completed?: boolean): Promise<Task[]> {
    const where: any = { user: { id: userId } };
    if (typeof completed !== 'undefined') where.completed = completed;

    // Aseguramos traer la relación user si se necesita (puedes omitirla si no quieres enviarla en la respuesta)
    return this.tasksRepository.find({ where, relations: ['user'], order: { createdAt: 'DESC' } });
  }

  async findOneForUser(id: string, userId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
    if (!task) throw new NotFoundException('Task not found');
    if (!task.user || task.user.id !== userId) throw new ForbiddenException('Access denied to this task');
    return task;
  }
}
