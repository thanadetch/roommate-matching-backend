import { Controller } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  // Create Room
  @MessagePattern({ cmd: 'create_room' })
  async handleCreateRoom(@Payload() data: any) {
    return this.roomsService.createRoom(data);
  }

  // Get All Rooms
  @MessagePattern({ cmd: 'get_all_rooms' })
  async handleGetAllRooms() {
    return this.roomsService.getRooms();
  }

  // Browse Rooms with filters
  @MessagePattern({ cmd: 'browse_rooms' })
  async handleBrowseRooms(@Payload() filters: any) {
    return this.roomsService.browseRooms(filters);
  }

  // Get Room By ID
  @MessagePattern({ cmd: 'get_room_by_id' })
  async handleGetRoomById(@Payload() id: string) {
    return this.roomsService.getRoomById(id);
  }

  // Update Room
  @MessagePattern({ cmd: 'update_room' })
  async handleUpdateRoom(@Payload() payload: { id: string; data: any }) {
    return this.roomsService.updateRoom(payload.id, payload.data);
  }

  // Delete Room
  @MessagePattern({ cmd: 'delete_room' })
  async handleDeleteRoom(@Payload() id: string) {
    return this.roomsService.deleteRoom(id);
  }
}
