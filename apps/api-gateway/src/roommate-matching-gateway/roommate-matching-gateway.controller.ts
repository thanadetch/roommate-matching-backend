import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoommateMatchingGatewayService } from './roommate-matching-gateway.service';

@Controller('roommate-matching-gateway')
export class RoommateMatchingGatewayController {
  constructor(
    private readonly matchingService: RoommateMatchingGatewayService,
  ) {}

  @Get('interests')
  async getInterests() {
    return this.matchingService.getInterests();
  }

  @Post('interests/:id/accept')
  async acceptInterest(@Param('id') id: string) {
    return this.matchingService.acceptInterest(id);
  }

  @Post('interests/:id/reject')
  async rejectInterest(@Param('id') id: string) {
    return this.matchingService.rejectInterest(id);
  }

  @Get('matches')
  async getAllMatches() {
    return this.matchingService.getAllMatches();
  }

  @Get('matches/:userId')
  async getMatchesByUser(@Param('userId') userId: string) {
    return this.matchingService.getMatchesByUser(userId);
  }

  @Delete('matches/:id')
  async deleteMatch(@Param('id') id: string) {
    return this.matchingService.deleteMatch(id);
  }

  @Post('match')
  async matchRoommates(@Body() dto: any) {
    return this.matchingService.matchRoommates(dto);
  }
}
