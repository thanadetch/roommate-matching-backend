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
  async create(@Body() dto: CreateRoomDto) {
    return this.roomsService.createRoom(dto);
  }

  @Get()
  async findAll() {
    return this.roomsService.getAllRooms();
  }

  @Get('browse')
  async browse(@Query() query: BrowseRoomsDto) {
    return this.roomsService.browseRooms(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roomsService.getRoomById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    return this.roomsService.updateRoom(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roomsService.deleteRoom(id);
  }
}
