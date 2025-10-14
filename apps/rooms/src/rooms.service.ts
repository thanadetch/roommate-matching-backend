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
    availableFrom?: string | Date;
    noSmoking?: boolean;
    petFriendly?: boolean;
    quiet?: boolean;
    nightOwl?: boolean;
  }): Promise<RoomListing> {
    return this.prisma.roomListing.create({
      data: {
        ...data,
        availableFrom: data.availableFrom ? new Date(data.availableFrom) : null,
      },
    });
  }

  // READ ALL
  async getRooms(): Promise<RoomListing[]> {
    return this.prisma.roomListing.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // FILTER / BROWSE
  async browseRooms(filters: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    noSmoking?: boolean;
    petFriendly?: boolean;
    quiet?: boolean;
    nightOwl?: boolean;
  }): Promise<RoomListing[]> {
    const { location, minPrice, maxPrice, noSmoking, petFriendly, quiet, nightOwl } = filters;

    return this.prisma.roomListing.findMany({
      where: {
        ...(location && { location: { contains: location, mode: 'insensitive' } }),
        ...(minPrice && { pricePerMonth: { gte: Number(minPrice) } }),
        ...(maxPrice && { pricePerMonth: { lte: Number(maxPrice) } }),
        ...(noSmoking !== undefined && { noSmoking }),
        ...(petFriendly !== undefined && { petFriendly }),
        ...(quiet !== undefined && { quiet }),
        ...(nightOwl !== undefined && { nightOwl }),
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
