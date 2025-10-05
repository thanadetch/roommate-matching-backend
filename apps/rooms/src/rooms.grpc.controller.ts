import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RoomsService } from './rooms.service';

@Controller()
export class RoomsGrpcController {
  constructor(private readonly roomsService: RoomsService) {}

  @GrpcMethod('RoomsService', 'CreateRoom')
  async createRoom(data: any) {
    return this.roomsService.createRoom(data);
  }

  @GrpcMethod('RoomsService', 'GetRooms')
  async getRooms() {
    const rooms = await this.roomsService.getRooms();
    return { rooms };
  }
}
