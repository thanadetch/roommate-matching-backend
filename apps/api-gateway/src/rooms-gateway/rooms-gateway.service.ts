import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateRoomDto,
  UpdateRoomDto,
  BrowseRoomsDto,
  RoomResponseDto,
} from '../../../rooms/src/dto';

@Injectable()
export class RoomsGatewayService {
  constructor(@Inject('ROOMS_SERVICE') private readonly client: ClientProxy) {}

  createRoom(dto: CreateRoomDto): Observable<RoomResponseDto> {
    return this.client.send('rooms.create', dto);
  }

  getAllRooms(): Observable<RoomResponseDto[]> {
    return this.client.send('rooms.findAll', {});
  }

  getRoomById(id: string): Observable<RoomResponseDto> {
    return this.client.send('rooms.findOne', id);
  }

  updateRoom(id: string, dto: UpdateRoomDto): Observable<RoomResponseDto> {
    return this.client.send('rooms.update', { id, data: dto });
  }

  deleteRoom(id: string): Observable<void> {
    return this.client.send('rooms.remove', id);
  }

  browseRooms(query: BrowseRoomsDto): Observable<RoomResponseDto[]> {
    return this.client.send('rooms.browse', query);
  }
}
