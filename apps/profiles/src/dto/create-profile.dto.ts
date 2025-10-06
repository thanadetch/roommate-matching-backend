import { Prisma } from '../../generated/prisma';

export class CreateProfileDto implements Partial<Prisma.ProfileCreateInput> {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
