import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RoomsGatewayService } from './rooms-gateway.service';
import {
  CreateRoomDto,
  UpdateRoomDto,
  BrowseRoomsDto,
} from '../../../rooms/src/dto';

@Controller('rooms')
export class RoomsGatewayController {
  constructor(private readonly roomsService: RoomsGatewayService) {}

  @Post()
  create(@Body() dto: CreateRoomDto) {
    return this.roomsService.createRoom(dto);
  }

  @Get()
  findAll() {
    return this.roomsService.getAllRooms();
  }

  @Get('browse')
  browse(@Query() query: BrowseRoomsDto) {
    return this.roomsService.browseRooms(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.getRoomById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.updateRoom(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.deleteRoom(id);
  }
}
