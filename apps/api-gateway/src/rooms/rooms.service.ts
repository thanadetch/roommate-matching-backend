import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RoomsService {
  constructor(
    @Inject('ROOMS_SERVICE') private readonly roomsClient: ClientProxy,
  ) {}

  findAll() {
    return this.roomsClient.send({ cmd: 'hello' }, {});
  }
}
