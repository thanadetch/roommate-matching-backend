import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoommateMatchingService } from './roommate-matching.service';

@Controller()
export class RoommateMatchingController {
  constructor(
    private readonly roommateMatchingService: RoommateMatchingService,
  ) {}

  // (pending, accepted, rejected)
  @MessagePattern({ cmd: 'get_interests' })
  async getInterests() {
    return this.roommateMatchingService.getAllInterests();
  }

  @MessagePattern({ cmd: 'accept_interest' })
  async acceptInterest(@Payload() data: { id: string }) {
    return this.roommateMatchingService.acceptInterest(data.id);
  }

  @MessagePattern({ cmd: 'reject_interest' })
  async rejectInterest(@Payload() data: { id: string }) {
    return this.roommateMatchingService.rejectInterest(data.id);
  }

  @MessagePattern({ cmd: 'get_all_matches' })
  async getAllMatches() {
    return this.roommateMatchingService.getAllMatches();
  }

  @MessagePattern({ cmd: 'get_matches_by_user' })
  async getMatchesByUser(@Payload() data: { userId: string }) {
    return this.roommateMatchingService.getMatchesByUser(data.userId);
  }

  @MessagePattern({ cmd: 'delete_match' })
  async deleteMatch(@Payload() data: { id: string }) {
    return this.roommateMatchingService.deleteMatch(data.id);
  }

  @MessagePattern({ cmd: 'match_roommates' })
  async matchRoommates(@Payload() dto: any) {
    return this.roommateMatchingService.matchRoommates(dto);
  }
}
