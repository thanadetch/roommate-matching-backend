import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProfilesGatewayService } from './profiles-gateway.service';
import { Observable } from 'rxjs';
import { ProfileResponse, ProfilesList } from '@app/common';
import { Profile } from 'apps/profiles/generated/prisma';
import { CreateProfileDto, UpdateProfileDto } from 'apps/profiles/src/dto';

@Controller('profiles')
export class ProfilesGatewayController {
  constructor(
    private readonly profilesGatewayService: ProfilesGatewayService,
  ) {}

  // TODO: not used
  @Get()
  getProfiles(): Observable<ProfilesList> {
    return this.profilesGatewayService.getProfiles();
  }

  // TODO: not used
  @Post()
  createProfile(
    @Body() createProfileData: CreateProfileDto,
  ): Observable<Profile> {
    return this.profilesGatewayService.createProfile(createProfileData);
  }

  @Put(':id')
  updateProfile(
    @Param('id') id: string,
    @Body() updateProfileData: UpdateProfileDto,
  ): Observable<Profile> {
    return this.profilesGatewayService.updateProfile({
      ...updateProfileData,
      id,
    });
  }

  @Get(':id')
  getProfileById(@Param('id') id: string): Observable<ProfileResponse> {
    return this.profilesGatewayService.getProfileById(id);
  }

  @Get('email/:email')
  getProfileByEmail(
    @Param('email') email: string,
  ): Observable<ProfileResponse> {
    return this.profilesGatewayService.getProfileByEmail(email);
  }

  // TODO: not used
  @Delete(':id')
  deleteProfile(@Param('id') id: string): Observable<Profile> {
    return this.profilesGatewayService.deleteProfile(id);
  }
}
