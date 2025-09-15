import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SubscribeDto {
  @IsOptional()
  @IsBoolean()
  notificationEnabled: boolean;
}
