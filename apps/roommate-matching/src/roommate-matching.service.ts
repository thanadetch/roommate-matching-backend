import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestStatusDto } from './dto/update-interest-status.dto';
import { InterestStatus } from '@app/common';

@Injectable()
export class RoommateMatchingService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new interest (seeker expressing interest in a room)
  async createInterest(createInterestDto: CreateInterestDto) {
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

    return this.prisma.interest.create({
      data: {
        roomId,
        hostId,
        seekerId,
        message,
        status: InterestStatus.PENDING,
      },
    });
  }

  // Update interest status (accept/reject)
  async updateInterestStatus(
    interestId: string,
    updateDto: UpdateInterestStatusDto,
  ) {
    const interest = await this.prisma.interest.findUnique({
      where: { id: interestId },
    });

    if (!interest) {
      throw new NotFoundException('Interest not found');
    }

    if (interest.status !== InterestStatus.PENDING) {
      throw new BadRequestException('Interest has already been processed');
    }

    return this.prisma.interest.update({
      where: { id: interestId },
      data: { status: updateDto.status },
    });
  }

  // Get interests received by host (for Interest Management screen)
  async getInterestsForHost(hostId: string, status?: InterestStatus) {
    const where: { hostId: string; status?: InterestStatus } = { hostId };
    if (status) {
      where.status = status;
    }

    return this.prisma.interest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get interests sent by seeker
  async getInterestsForSeeker(seekerId: string, status?: InterestStatus) {
    const where: { seekerId: string; status?: InterestStatus } = { seekerId };
    if (status) {
      where.status = status;
    }

    return this.prisma.interest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get matches for host (accepted interests where user is host)
  async getMatchesAsHost(hostId: string) {
    return this.prisma.interest.findMany({
      where: {
        hostId,
        status: InterestStatus.ACCEPTED,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  // Get matches for seeker (accepted interests where user is seeker)
  async getMatchesAsSeeker(seekerId: string) {
    return this.prisma.interest.findMany({
      where: {
        seekerId,
        status: InterestStatus.ACCEPTED,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  // Get all matches for a user (both as host and seeker)
  async getAllMatches(userId: string) {
    const [asHost, asSeeker] = await Promise.all([
      this.getMatchesAsHost(userId),
      this.getMatchesAsSeeker(userId),
    ]);

    return {
      asHost,
      asSeeker,
      total: asHost.length + asSeeker.length,
    };
  }

  // Get interest counts by status for a host
  async getInterestCounts(hostId: string) {
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
  async getInterestById(interestId: string) {
    const interest = await this.prisma.interest.findUnique({
      where: { id: interestId },
    });

    if (!interest) {
      throw new NotFoundException('Interest not found');
    }

    return interest;
  }

  // Accept interest (convenience method)
  async acceptInterest(interestId: string) {
    return this.updateInterestStatus(interestId, {
      status: InterestStatus.ACCEPTED,
    });
  }

  // Reject interest (convenience method)
  async rejectInterest(interestId: string) {
    return this.updateInterestStatus(interestId, {
      status: InterestStatus.REJECTED,
    });
  }
}
