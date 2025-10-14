import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RoomsGatewayService {
  constructor(@Inject('ROOMS_SERVICE') private readonly client: ClientProxy) {}

  createRoom(dto: any) {
    return this.client.send('rooms.create', dto);
  }

  getAllRooms() {
    return this.client.send('rooms.findAll', {});
  }

  getRoomById(id: string) {
    return this.client.send('rooms.findOne', id);
  }

  updateRoom(id: string, dto: any) {
    return this.client.send('rooms.update', { id, data: dto });
  }

  deleteRoom(id: string) {
    return this.client.send('rooms.remove', id);
  }

  browseRooms(query: any) {
    return this.client.send('rooms.browse', query);
  }
}
