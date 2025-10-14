import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoommateMatchingService } from './roommate-matching.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestStatusDto } from './dto/update-interest-status.dto';
import { InterestStatus } from '@app/common';

@Controller()
export class RoommateMatchingController {
  constructor(
    private readonly roommateMatchingService: RoommateMatchingService,
  ) {}

  // Create new interest (seeker expresses interest in a room)
  @MessagePattern('interest.create')
  createInterest(@Payload() createInterestDto: CreateInterestDto) {
    return this.roommateMatchingService.createInterest(createInterestDto);
  }

  // Get specific interest by ID
  @MessagePattern('interest.findById')
  getInterestById(@Payload() data: { id: string }) {
    return this.roommateMatchingService.getInterestById(data.id);
  }

  // Update interest status (accept/reject)
  @MessagePattern('interest.updateStatus')
  updateInterestStatus(
    @Payload() data: { id: string; updateDto: UpdateInterestStatusDto },
  ) {
    return this.roommateMatchingService.updateInterestStatus(
      data.id,
      data.updateDto,
    );
  }

  // Accept interest (convenience endpoint)
  @MessagePattern('interest.accept')
  acceptInterest(@Payload() data: { id: string }) {
    return this.roommateMatchingService.acceptInterest(data.id);
  }

  // Reject interest (convenience endpoint)
  @MessagePattern('interest.reject')
  rejectInterest(@Payload() data: { id: string }) {
    return this.roommateMatchingService.rejectInterest(data.id);
  }

  // Get interests for host (Interest Management screen)
  @MessagePattern('interest.findByHost')
  getInterestsForHost(
    @Payload() data: { hostId: string; status?: InterestStatus },
  ) {
    return this.roommateMatchingService.getInterestsForHost(
      data.hostId,
      data.status,
    );
  }

  // Get interests for seeker
  @MessagePattern('interest.findBySeeker')
  getInterestsForSeeker(
    @Payload() data: { seekerId: string; status?: InterestStatus },
  ) {
    return this.roommateMatchingService.getInterestsForSeeker(
      data.seekerId,
      data.status,
    );
  }

  // Get interest counts for host (for tab badges: Pending (3), Accepted (1), Rejected (1))
  @MessagePattern('interest.getHostCounts')
  getInterestCounts(@Payload() data: { hostId: string }) {
    return this.roommateMatchingService.getInterestCounts(data.hostId);
  }

  // Get matches as host (My Matches - As Host section)
  @MessagePattern('match.findAsHost')
  getMatchesAsHost(@Payload() data: { hostId: string }) {
    return this.roommateMatchingService.getMatchesAsHost(data.hostId);
  }

  // Get matches as seeker (My Matches - As Seeker section)
  @MessagePattern('match.findAsSeeker')
  getMatchesAsSeeker(@Payload() data: { seekerId: string }) {
    return this.roommateMatchingService.getMatchesAsSeeker(data.seekerId);
  }

  // Get all matches for a user (both as host and seeker)
  @MessagePattern('match.findByUser')
  getAllMatches(@Payload() data: { userId: string }) {
    return this.roommateMatchingService.getAllMatches(data.userId);
  }
}
