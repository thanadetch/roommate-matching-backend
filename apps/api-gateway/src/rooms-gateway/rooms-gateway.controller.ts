import { Controller, Get } from '@nestjs/common';
import { RoomsGatewayService } from './rooms-gateway.service';

@Controller('rooms')
export class RoomsGatewayController {
  constructor(private readonly roomsGatewayService: RoomsGatewayService) {}

  @Get()
  findAll() {
    return this.roomsGatewayService.findAll();
  }
}
