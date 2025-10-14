import { Controller } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  // Create Room
  @MessagePattern('rooms.create')
  async handleCreateRoom(@Payload() data: any) {
    return this.roomsService.createRoom(data);
  }

  // Get All Rooms
  @MessagePattern('rooms.findAll')
  async handleGetAllRooms() {
    return this.roomsService.getRooms();
  }

  // Browse Rooms with filters
  @MessagePattern('rooms.browse')
  async handleBrowseRooms(@Payload() filters: any) {
    return this.roomsService.browseRooms(filters);
  }

  // Get Room By ID
  @MessagePattern('rooms.findOne')
  async handleGetRoomById(@Payload() id: string) {
    return this.roomsService.getRoomById(id);
  }

  // Update Room
  @MessagePattern('rooms.update')
  async handleUpdateRoom(@Payload() payload: { id: string; data: any }) {
    return this.roomsService.updateRoom(payload.id, payload.data);
  }

  // Delete Room
  @MessagePattern('rooms.remove')
  async handleDeleteRoom(@Payload() id: string) {
    return this.roomsService.deleteRoom(id);
  }
}
