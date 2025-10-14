import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateInterestDto } from '../../../roommate-matching/src/dto/create-interest.dto';
import { UpdateInterestStatusDto } from '../../../roommate-matching/src/dto/update-interest-status.dto';
import { GetInterestsDto } from '../../../roommate-matching/src/dto/get-interests.dto';
import { InterestResponseDto } from '../../../roommate-matching/src/dto/interest-response.dto';
import { InterestCountsResponseDto } from '../../../roommate-matching/src/dto/interest-counts-response.dto';
import { MatchesResponseDto } from '../../../roommate-matching/src/dto/matches-response.dto';

@Injectable()
export class RoommateMatchingGatewayService {
  constructor(
    @Inject('ROOMMATE_MATCHING_SERVICE')
    private readonly matchingClient: ClientProxy,
  ) {}

  async createInterest(
    createInterestDto: CreateInterestDto,
  ): Promise<InterestResponseDto> {
    return firstValueFrom(
      this.matchingClient.send('interest.create', createInterestDto),
    );
  }

  async getInterestById(id: string): Promise<InterestResponseDto> {
    return firstValueFrom(
      this.matchingClient.send('interest.findById', { id }),
    );
  }

  async updateInterestStatus(
    id: string,
    updateDto: UpdateInterestStatusDto,
  ): Promise<InterestResponseDto> {
    return firstValueFrom(
      this.matchingClient.send('interest.updateStatus', { id, updateDto }),
    );
  }

  async acceptInterest(id: string): Promise<InterestResponseDto> {
    return firstValueFrom(this.matchingClient.send('interest.accept', { id }));
  }

  async rejectInterest(id: string): Promise<InterestResponseDto> {
    return firstValueFrom(this.matchingClient.send('interest.reject', { id }));
  }

  async getInterestsForHost(
    hostId: string,
    query: GetInterestsDto,
  ): Promise<InterestResponseDto[]> {
    return firstValueFrom(
      this.matchingClient.send('interest.findByHost', {
        hostId,
        status: query.status,
      }),
    );
  }

  async getInterestsForSeeker(
    seekerId: string,
    query: GetInterestsDto,
  ): Promise<InterestResponseDto[]> {
    return firstValueFrom(
      this.matchingClient.send('interest.findBySeeker', {
        seekerId,
        status: query.status,
      }),
    );
  }

  async getInterestCounts(hostId: string): Promise<InterestCountsResponseDto> {
    return firstValueFrom(
      this.matchingClient.send('interest.getHostCounts', { hostId }),
    );
  }

  async getMatchesAsHost(hostId: string): Promise<InterestResponseDto[]> {
    return firstValueFrom(
      this.matchingClient.send('match.findAsHost', { hostId }),
    );
  }

  async getMatchesAsSeeker(seekerId: string): Promise<InterestResponseDto[]> {
    return firstValueFrom(
      this.matchingClient.send('match.findAsSeeker', { seekerId }),
    );
  }

  async getAllMatches(userId: string): Promise<MatchesResponseDto> {
    return firstValueFrom(
      this.matchingClient.send('match.findByUser', { userId }),
    );
  }
}
