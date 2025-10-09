import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
 
// RabbitMQ
@MessagePattern({ cmd: 'create_room' })
  async handleCreateRoom(@Payload() data: any) {
    return this.roomsService.createRoom(data);
  }

  @MessagePattern({ cmd: 'get_all_rooms' })
  async handleGetAllRooms() {
    return this.roomsService.getRooms();
  }

  @MessagePattern({ cmd: 'get_room_by_id' })
  async handleGetRoomById(@Payload() id: string) {
    return this.roomsService.getRoomById(id);
  }

  @MessagePattern({ cmd: 'update_room' })
  async handleUpdateRoom(@Payload() payload: { id: string; data: any }) {
    return this.roomsService.updateRoom(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_room' })
  async handleDeleteRoom(@Payload() id: string) {
    return this.roomsService.deleteRoom(id);
  }
}
