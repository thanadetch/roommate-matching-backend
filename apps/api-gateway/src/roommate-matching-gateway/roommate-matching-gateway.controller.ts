import { Controller } from '@nestjs/common';
import { RoommateMatchingGatewayService } from './roommate-matching-gateway.service';

@Controller('roommate-matching')
export class RoommateMatchingGatewayController {
  constructor(
    private readonly roommateMatchingGatewayService: RoommateMatchingGatewayService,
  ) {}
}
