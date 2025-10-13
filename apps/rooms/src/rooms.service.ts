import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/prisma.service';
import { Prisma, RoomListing } from '../generated/prisma';  

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async createRoom(data: {
    hostId: string;
    title: string;
    description?: string;
    location: string;
    pricePerMonth: number;
    rules?: any;
    availableFrom?: Date;
    lifestyle?: string[]; // field lifestyle
  }): Promise<RoomListing> {
    return this.prisma.roomListing.create({ data });
  }

  // READ ALL
  async getRooms(): Promise<RoomListing[]> {
    return this.prisma.roomListing.findMany();
  }

  // BROWSE / FILTER ROOMS
  async browseRooms(filters: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    lifestyle?: string[];
  }): Promise<RoomListing[]> {
    const { location, minPrice, maxPrice, lifestyle } = filters;

    return this.prisma.roomListing.findMany({
      where: {
        ...(location && { location: { contains: location, mode: 'insensitive' } }),
        ...(minPrice && { pricePerMonth: { gte: Number(minPrice) } }),
        ...(maxPrice && { pricePerMonth: { lte: Number(maxPrice) } }),
        ...(lifestyle && lifestyle.length > 0 && { lifestyle: { hasSome: lifestyle } }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // READ ONE
  async getRoomById(id: string): Promise<RoomListing | null> {
    return this.prisma.roomListing.findUnique({
      where: { id },
    });
  }

  // UPDATE
  async updateRoom(id: string, data: Prisma.RoomListingUpdateInput): Promise<RoomListing> {
    return this.prisma.roomListing.update({
      where: { id },
      data,
    });
  }

  // DELETE
  async deleteRoom(id: string): Promise<{ message: string }> {
  await this.prisma.roomListing.delete({
    where: { id },
  });
  return { message: 'Room deleted successfully' };
}

}
