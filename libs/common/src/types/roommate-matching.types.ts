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

export interface InterestResponseDto {
  id: string;
  roomId: string;
  hostId: string;
  seekerId: string;
  message?: string;
  status: InterestStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface InterestCountsResponseDto {
  pending: number;
  accepted: number;
  rejected: number;
}

export interface MatchesResponseDto {
  asHost: InterestResponseDto[];
  asSeeker: InterestResponseDto[];
  total: number;
}
