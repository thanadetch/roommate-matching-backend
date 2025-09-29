import { Controller } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @MessagePattern({ cmd: 'hello' })
  getHello(): string {
    return this.roomsService.getHello();
  }
}
