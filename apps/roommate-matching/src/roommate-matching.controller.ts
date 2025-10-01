import { Controller, Get } from '@nestjs/common';
import { RoommateMatchingService } from './roommate-matching.service';

@Controller()
export class RoommateMatchingController {
  constructor(
    private readonly roommateMatchingService: RoommateMatchingService,
  ) {}

  @Get()
  getHello(): string {
    return this.roommateMatchingService.getHello();
  }
}
