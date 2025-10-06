import { Prisma, Gender } from '../../generated/prisma';

export class UpdateProfileDto implements Partial<Prisma.ProfileUpdateInput> {
  id: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  budgetMin?: number;
  budgetMax?: number;
  preferredArea?: string;
  smoking?: boolean;
  petOwner?: boolean;
  nightOwl?: boolean;
  quietPerson?: boolean;
  contactLine?: string;
  contactEmail?: string;
}
