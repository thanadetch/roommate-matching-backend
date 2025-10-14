export enum InterestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface CreateInterestDto {
  roomId: string;
  hostId: string;
  seekerId: string;
  message?: string;
}

export interface UpdateInterestStatusDto {
  status: InterestStatus;
}

export interface GetInterestsQueryDto {
  status?: InterestStatus;
}
