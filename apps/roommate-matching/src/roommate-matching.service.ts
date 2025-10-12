import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class RoommateMatchingService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllInterests() {
    return this.prisma.interest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async acceptInterest(id: string) {
    const interest = await this.prisma.interest.update({
      where: { id },
      data: { status: 'ACCEPTED' },
    });

    const match = await this.prisma.roommateMatch.create({
      data: {
        roomListingId: interest.roomListingId,
        hostId: 'HOST_TEMP_ID', 
        seekerId: interest.seekerId,
      },
    });

    return {
      message: 'Interest accepted and match created successfully',
      interest,
      match,
    };
  }

  async rejectInterest(id: string) {
    const interest = await this.prisma.interest.update({
      where: { id },
      data: { status: 'REJECTED' },
    });

    return {
      message: 'Interest rejected successfully',
      interest,
    };
  }

  async getAllMatches() {
    return this.prisma.roommateMatch.findMany({
      orderBy: { matchedAt: 'desc' },
    });
  }

  // pull matches any users (host or seeker)
  async getMatchesByUser(userId: string) {
    return this.prisma.roommateMatch.findMany({
      where: {
        OR: [{ hostId: userId }, { seekerId: userId }],
      },
      orderBy: { matchedAt: 'desc' },
    });
  }

  async deleteMatch(id: string) {
    await this.prisma.roommateMatch.delete({ where: { id } });
    return { message: 'Match deleted successfully' };
  }

  // matches by custom (optional)
  async matchRoommates(dto: any) {
    return this.prisma.roommateMatch.create({
      data: dto,
    });
  }
}
