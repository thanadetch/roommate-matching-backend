import { Controller } from '@nestjs/common';
import { RoommateMatchingService } from './roommate-matching.service';

@Controller('roommate-matching')
export class RoommateMatchingController {
  constructor(private readonly roommateMatchingService: RoommateMatchingService) {}
}
