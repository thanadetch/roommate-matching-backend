import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { ClientGrpc } from '@nestjs/microservices';
import {
  LoginResponseDto,
  ValidatedUser,
  RegisterRequestDto,
  ValidateUserRequestDto,
  JwtPayload,
} from './dto';
import * as bcrypt from 'bcrypt';
import { ProfilesGrpcService, ProfileEmail } from '@app/common';
import { lastValueFrom } from 'rxjs';
import { Profile } from 'apps/profiles/generated/prisma';
import { CreateProfileDto } from '../../profiles/src/dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private profilesService: ProfilesGrpcService;

  constructor(
    private readonly jwtService: JwtService,
    @Inject('PROFILES_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    console.log('Auth service initializing gRPC client...');
    this.profilesService =
      this.client.getService<ProfilesGrpcService>('ProfilesService');
  }

  login(user: ValidatedUser): LoginResponseDto {
    const payload: JwtPayload = { sub: user.userId, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    validateUserDto: ValidateUserRequestDto,
  ): Promise<ValidatedUser | null> {
    try {
      const profileRequest: ProfileEmail = { email: validateUserDto.email };

      const profile = await lastValueFrom(
        this.profilesService.getProfileByEmailWithPassword(profileRequest),
      );

      if (!profile) {
        return null;
      }

      // Compare the provided password with the stored password hash
      const isPasswordValid = await bcrypt.compare(
        validateUserDto.password,
        profile.password,
      );

      if (!isPasswordValid) {
        return null;
      }

      return {
        userId: profile.id,
        email: profile.email,
      };
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }

  async register(registerDto: RegisterRequestDto): Promise<Profile> {
    // Check if user already exists
    const emailRequest: ProfileEmail = {
      email: registerDto.email,
    };

    const existingProfile = await lastValueFrom(
      this.profilesService.getProfileByEmail(emailRequest),
    );

    if (existingProfile) {
      throw new Error('User already exists');
    }

    // Hash password and create profile
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const profileData: CreateProfileDto = {
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      password: hashedPassword,
    };

    const newProfile = await lastValueFrom(
      this.profilesService.createProfile(profileData),
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete newProfile.password;

    return newProfile;
  }
}
