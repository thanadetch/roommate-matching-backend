import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RoomsGatewayService {
  constructor(@Inject('ROOMS_SERVICE') private readonly client: ClientProxy) {}

  async createRoom(dto: any) {
    return this.client.send({ cmd: 'create_room' }, dto);
  }

  async getAllRooms() {
    return this.client.send({ cmd: 'get_all_rooms' }, {});
  }

  async getRoomById(id: string) {
    return this.client.send({ cmd: 'get_room_by_id' }, id);
  }

  async updateRoom(id: string, dto: any) {
  return this.client.send({ cmd: 'update_room' }, { id, data: dto });
  }

  async deleteRoom(id: string) {
    return this.client.send({ cmd: 'delete_room' }, id);
  }

  async browseRooms(query: any) {
  return this.client.send({ cmd: 'browse_rooms' }, query);
}

}
