import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoomsGatewayService } from './rooms-gateway.service';

@Controller('rooms-gateway')
export class RoomsGatewayController {
  constructor(private readonly roomsService: RoomsGatewayService) {}

  @Post()
  async create(@Body() dto: any) {
    return this.roomsService.createRoom(dto);
  }

  @Get()
  async findAll() {
    return this.roomsService.getAllRooms();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roomsService.getRoomById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.roomsService.updateRoom({ id, ...dto });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roomsService.deleteRoom(id);
  }
}
