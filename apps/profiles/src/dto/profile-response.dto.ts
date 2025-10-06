import { Gender } from '../../generated/prisma';

export class ProfileResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: Gender | null;
  budgetMin?: number | null;
  budgetMax?: number | null;
  preferredArea?: string | null;
  smoking?: boolean | null;
  petOwner?: boolean | null;
  nightOwl?: boolean | null;
  quietPerson?: boolean | null;
  contactLine?: string | null;
  contactEmail?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
