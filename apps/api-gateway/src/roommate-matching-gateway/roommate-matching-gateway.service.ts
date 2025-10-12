import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RoommateMatchingGatewayService {
  constructor(
    @Inject('ROOMMATE_MATCHING_SERVICE')
    private readonly matchingClient: ClientProxy,
  ) {}

  // (pending, accepted, rejected)
  async getInterests() {
    return firstValueFrom(this.matchingClient.send({ cmd: 'get_interests' }, {}));
  }

  async acceptInterest(id: string) {
    return firstValueFrom(this.matchingClient.send({ cmd: 'accept_interest' }, { id }));
  }

  async rejectInterest(id: string) {
    return firstValueFrom(this.matchingClient.send({ cmd: 'reject_interest' }, { id }));
  }

  async getAllMatches() {
    return firstValueFrom(this.matchingClient.send({ cmd: 'get_all_matches' }, {}));
  }

  async getMatchesByUser(userId: string) {
    return firstValueFrom(this.matchingClient.send({ cmd: 'get_matches_by_user' }, { userId }));
  }

  async deleteMatch(id: string) {
    return firstValueFrom(this.matchingClient.send({ cmd: 'delete_match' }, { id }));
  }

  async matchRoommates(dto: any) {
    return firstValueFrom(this.matchingClient.send({ cmd: 'match_roommates' }, dto));
  }
}
