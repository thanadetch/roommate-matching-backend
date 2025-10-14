import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RoommateMatchingGatewayService } from './roommate-matching-gateway.service';
import {
  InterestResponseDto,
  InterestCountsResponseDto,
  MatchesResponseDto,
} from '@app/common';
import { CreateInterestDto } from '../../../roommate-matching/src/dto/create-interest.dto';
import { UpdateInterestStatusDto } from '../../../roommate-matching/src/dto/update-interest-status.dto';
import { GetInterestsDto } from '../../../roommate-matching/src/dto/get-interests.dto';

@Controller('roommate-matching')
export class RoommateMatchingGatewayController {
  constructor(
    private readonly matchingService: RoommateMatchingGatewayService,
  ) {}

  // Create new interest (seeker expresses interest in a room)
  @Post('interests')
  async createInterest(
    @Body() createInterestDto: CreateInterestDto,
  ): Promise<InterestResponseDto> {
    return this.matchingService.createInterest(createInterestDto);
  }

  // Get specific interest by ID
  @Get('interests/:id')
  async getInterestById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<InterestResponseDto> {
    return this.matchingService.getInterestById(id);
  }

  // Update interest status (accept/reject)
  @Put('interests/:id/status')
  async updateInterestStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateInterestStatusDto,
  ): Promise<InterestResponseDto> {
    return this.matchingService.updateInterestStatus(id, updateDto);
  }

  // Accept interest (convenience endpoint for UI Accept button)
  @Put('interests/:id/accept')
  async acceptInterest(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<InterestResponseDto> {
    return this.matchingService.acceptInterest(id);
  }

  // Reject interest (convenience endpoint for UI Reject button)
  @Put('interests/:id/reject')
  async rejectInterest(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<InterestResponseDto> {
    return this.matchingService.rejectInterest(id);
  }

  // Get interests for host (Interest Management screen with status filtering)
  @Get('interests/host/:hostId')
  async getInterestsForHost(
    @Param('hostId') hostId: string,
    @Query() query: GetInterestsDto,
  ): Promise<InterestResponseDto[]> {
    return this.matchingService.getInterestsForHost(hostId, query);
  }

  // Get interests for seeker
  @Get('interests/seeker/:seekerId')
  async getInterestsForSeeker(
    @Param('seekerId') seekerId: string,
    @Query() query: GetInterestsDto,
  ): Promise<InterestResponseDto[]> {
    return this.matchingService.getInterestsForSeeker(seekerId, query);
  }

  // Get interest counts for host (for tab badges: Pending (3), Accepted (1), Rejected (1))
  @Get('interests/host/:hostId/counts')
  async getInterestCounts(
    @Param('hostId') hostId: string,
  ): Promise<InterestCountsResponseDto> {
    return this.matchingService.getInterestCounts(hostId);
  }

  // Get matches as host (My Matches - As Host section)
  @Get('matches/host/:hostId')
  async getMatchesAsHost(
    @Param('hostId') hostId: string,
  ): Promise<InterestResponseDto[]> {
    return this.matchingService.getMatchesAsHost(hostId);
  }

  // Get matches as seeker (My Matches - As Seeker section)
  @Get('matches/seeker/:seekerId')
  async getMatchesAsSeeker(
    @Param('seekerId') seekerId: string,
  ): Promise<InterestResponseDto[]> {
    return this.matchingService.getMatchesAsSeeker(seekerId);
  }

  // Get all matches for a user (both as host and seeker)
  @Get('matches/user/:userId')
  async getAllMatches(
    @Param('userId') userId: string,
  ): Promise<MatchesResponseDto> {
    return this.matchingService.getAllMatches(userId);
  }
}
