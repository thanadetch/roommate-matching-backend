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
  }): Promise<RoomListing> {
    return this.prisma.roomListing.create({ data });
  }

  // READ ALL
  async getRooms(): Promise<RoomListing[]> {
    return this.prisma.roomListing.findMany();
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
  async deleteRoom(id: string): Promise<RoomListing> {
    return this.prisma.roomListing.delete({
      where: { id },
    });
  }
}
