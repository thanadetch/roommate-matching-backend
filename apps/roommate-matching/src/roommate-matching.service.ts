import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { PrismaService } from './prisma.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestStatusDto } from './dto/update-interest-status.dto';
import { InterestResponseDto } from './dto/interest-response.dto';
import { InterestCountsResponseDto } from './dto/interest-counts-response.dto';
import { MatchesResponseDto } from './dto/matches-response.dto';
import { RoomResponseDto } from '../../rooms/src/dto';
import { ProfileResponseDto } from '../../profiles/src/dto';
import {
  CreateNotificationDto,
  NotificationType,
} from '../../notifications/src/dto';
import { InterestStatus } from '@app/common';
import { Interest } from '../generated/prisma';
import { ProfilesGrpcService } from '@app/common';

@Injectable()
export class RoommateMatchingService implements OnModuleInit {
  private profilesService: ProfilesGrpcService;

  constructor(
    private readonly prisma: PrismaService,
    @Inject('ROOMS_SERVICE')
    private readonly roomsClient: ClientProxy,
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationsClient: ClientProxy,
    @Inject('PROFILES_PACKAGE')
    private readonly profilesClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.profilesService =
      this.profilesClient.getService<ProfilesGrpcService>('ProfilesService');
  }

  // Helper method to fetch room details
  private async getRoomDetails(
    roomId: string,
  ): Promise<RoomResponseDto | null> {
    try {
      return await firstValueFrom(
        this.roomsClient.send('rooms.findOne', roomId),
      );
    } catch (error) {
      console.warn(`Failed to fetch room details for ID ${roomId}:`, error);
      return null;
    }
  }

  // Helper method to fetch profile details
  private async getProfileDetails(
    profileId: string,
  ): Promise<ProfileResponseDto | null> {
    try {
      const response = await lastValueFrom(
        this.profilesService.getProfileById({ id: profileId }),
      );
      return response?.result || null;
    } catch (error) {
      console.warn(
        `Failed to fetch profile details for ID ${profileId}:`,
        error,
      );
      return null;
    }
  }

  // Helper method to enrich interests with room and profile data
  private async enrichInterestsWithRoomAndProfileData(
    interests: Interest[],
  ): Promise<InterestResponseDto[]> {
    const enrichedInterests = await Promise.all(
      interests.map(async (interest) => {
        const [roomDetails, hostProfile, seekerProfile] = await Promise.all([
          this.getRoomDetails(interest.roomId),
          this.getProfileDetails(interest.hostId),
          this.getProfileDetails(interest.seekerId),
        ]);
        return {
          ...interest,
          room: roomDetails,
          host: hostProfile,
          seeker: seekerProfile,
        };
      }),
    );
    return enrichedInterests;
  }

  // Create a new interest (seeker expressing interest in a room)
  async createInterest(
    createInterestDto: CreateInterestDto,
  ): Promise<InterestResponseDto> {
    const { roomId, hostId, seekerId, message } = createInterestDto;

    // Check if interest already exists
    const existingInterest = await this.prisma.interest.findFirst({
      where: {
        roomId,
        seekerId,
        status: { in: [InterestStatus.PENDING, InterestStatus.ACCEPTED] },
      },
    });

    if (existingInterest) {
      throw new BadRequestException('Interest already exists for this room');
    }

    const newInterest = await this.prisma.interest.create({
      data: {
        roomId,
        hostId,
        seekerId,
        message,
        status: InterestStatus.PENDING,
      },
    });

    // Enrich with room and profile data
    const [roomDetails, hostProfile, seekerProfile] = await Promise.all([
      this.getRoomDetails(roomId),
      this.getProfileDetails(hostId),
      this.getProfileDetails(seekerId),
    ]);

    // Send notification to host about new interest request
    if (roomDetails && seekerProfile) {
      const notificationDto: CreateNotificationDto = {
        userId: hostId,
        type: NotificationType.INTEREST_REQUEST,
        title: 'New Interest Request',
        message: `${seekerProfile.firstName} ${seekerProfile.lastName} is interested in "${roomDetails.title}"`,
      };

      try {
        await firstValueFrom(
          this.notificationsClient.send(
            'notifications.create',
            notificationDto,
          ),
        );
      } catch (error) {
        console.warn('Failed to send notification:', error);
      }
    }

    return {
      ...newInterest,
      room: roomDetails,
      host: hostProfile,
      seeker: seekerProfile,
    };
  }

  // Update interest status (accept/reject)
  async updateInterestStatus(
    interestId: string,
    updateDto: UpdateInterestStatusDto,
  ): Promise<InterestResponseDto> {
    const interest = await this.prisma.interest.findUnique({
      where: { id: interestId },
    });

    if (!interest) {
      throw new NotFoundException('Interest not found');
    }

    if (interest.status !== InterestStatus.PENDING) {
      throw new BadRequestException('Interest has already been processed');
    }

    const updatedInterest = await this.prisma.interest.update({
      where: { id: interestId },
      data: { status: updateDto.status },
    });

    // Enrich with room and profile data
    const [roomDetails, hostProfile, seekerProfile] = await Promise.all([
      this.getRoomDetails(updatedInterest.roomId),
      this.getProfileDetails(updatedInterest.hostId),
      this.getProfileDetails(updatedInterest.seekerId),
    ]);

    return {
      ...updatedInterest,
      room: roomDetails,
      host: hostProfile,
      seeker: seekerProfile,
    };
  }

  // Get interests received by host (for Interest Management screen)
  async getInterestsForHost(
    hostId: string,
    status?: InterestStatus,
  ): Promise<InterestResponseDto[]> {
    const where: { hostId: string; status?: InterestStatus } = { hostId };
    if (status) {
      where.status = status;
    }

    const interests = await this.prisma.interest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Enrich all interests with room and profile data
    return this.enrichInterestsWithRoomAndProfileData(interests);
  }

  // Get interests sent by seeker
  async getInterestsForSeeker(
    seekerId: string,
    status?: InterestStatus,
  ): Promise<InterestResponseDto[]> {
    const where: { seekerId: string; status?: InterestStatus } = { seekerId };
    if (status) {
      where.status = status;
    }

    const interests = await this.prisma.interest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Enrich all interests with room and profile data
    return this.enrichInterestsWithRoomAndProfileData(interests);
  }

  // Get matches for host (accepted interests where user is host)
  async getMatchesAsHost(hostId: string): Promise<InterestResponseDto[]> {
    const matches = await this.prisma.interest.findMany({
      where: {
        hostId,
        status: InterestStatus.ACCEPTED,
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Enrich all matches with room and profile data
    return this.enrichInterestsWithRoomAndProfileData(matches);
  }

  // Get matches for seeker (accepted interests where user is seeker)
  async getMatchesAsSeeker(seekerId: string): Promise<InterestResponseDto[]> {
    const matches = await this.prisma.interest.findMany({
      where: {
        seekerId,
        status: InterestStatus.ACCEPTED,
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Enrich all matches with room and profile data
    return this.enrichInterestsWithRoomAndProfileData(matches);
  }

  // Get all matches for a user (both as host and seeker)
  async getAllMatches(userId: string): Promise<MatchesResponseDto> {
    const [asHostRaw, asSeekerRaw] = await Promise.all([
      this.prisma.interest.findMany({
        where: {
          hostId: userId,
          status: InterestStatus.ACCEPTED,
        },
        orderBy: { updatedAt: 'desc' },
      }),
      this.prisma.interest.findMany({
        where: {
          seekerId: userId,
          status: InterestStatus.ACCEPTED,
        },
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    // Enrich both arrays with room and profile data
    const [asHost, asSeeker] = await Promise.all([
      this.enrichInterestsWithRoomAndProfileData(asHostRaw),
      this.enrichInterestsWithRoomAndProfileData(asSeekerRaw),
    ]);

    return {
      asHost,
      asSeeker,
      total: asHost.length + asSeeker.length,
    };
  }

  // Get interest counts by status for a host
  async getInterestCounts(hostId: string): Promise<InterestCountsResponseDto> {
    const [pending, accepted, rejected] = await Promise.all([
      this.prisma.interest.count({
        where: { hostId, status: InterestStatus.PENDING },
      }),
      this.prisma.interest.count({
        where: { hostId, status: InterestStatus.ACCEPTED },
      }),
      this.prisma.interest.count({
        where: { hostId, status: InterestStatus.REJECTED },
      }),
    ]);

    return { pending, accepted, rejected };
  }

  // Get single interest by ID
  async getInterestById(interestId: string): Promise<InterestResponseDto> {
    const interest = await this.prisma.interest.findUnique({
      where: { id: interestId },
    });

    if (!interest) {
      throw new NotFoundException('Interest not found');
    }

    // Enrich with room and profile data
    const [roomDetails, hostProfile, seekerProfile] = await Promise.all([
      this.getRoomDetails(interest.roomId),
      this.getProfileDetails(interest.hostId),
      this.getProfileDetails(interest.seekerId),
    ]);

    return {
      ...interest,
      room: roomDetails,
      host: hostProfile,
      seeker: seekerProfile,
    };
  }

  // Accept interest (convenience method)
  async acceptInterest(interestId: string): Promise<InterestResponseDto> {
    const result = await this.updateInterestStatus(interestId, {
      status: InterestStatus.ACCEPTED,
    });

    // Send notification to seeker about new match
    if (result.room && result.seeker && result.host) {
      const notificationDto: CreateNotificationDto = {
        userId: result.seekerId,
        type: NotificationType.MATCH_FOUND,
        title: 'New Match!',
        message: `You matched with ${result.host.firstName} ${result.host.lastName} for "${result.room.title}"`,
      };

      try {
        await firstValueFrom(
          this.notificationsClient.send(
            'notifications.create',
            notificationDto,
          ),
        );
      } catch (error) {
        console.warn('Failed to send notification:', error);
      }
    }

    return result;
  }

  // Reject interest (convenience method)
  async rejectInterest(interestId: string): Promise<InterestResponseDto> {
    return this.updateInterestStatus(interestId, {
      status: InterestStatus.REJECTED,
    });
  }
}
