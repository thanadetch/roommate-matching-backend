import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RoomsGatewayService {
  constructor(@Inject('ROOMS_SERVICE') private readonly roomsClient: ClientProxy) {}

  async createRoom(dto: any) {
    return firstValueFrom(this.roomsClient.send({ cmd: 'create_room' }, dto));
  }

  async getAllRooms() {
    return firstValueFrom(this.roomsClient.send({ cmd: 'get_rooms' }, {}));
  }

  async getRoomById(id: string) {
    return firstValueFrom(this.roomsClient.send({ cmd: 'get_room_by_id' }, { id }));
  }

  async updateRoom(dto: any) {
    return firstValueFrom(this.roomsClient.send({ cmd: 'update_room' }, dto));
  }

  async deleteRoom(id: string) {
    return firstValueFrom(this.roomsClient.send({ cmd: 'delete_room' }, { id }));
  }
}
