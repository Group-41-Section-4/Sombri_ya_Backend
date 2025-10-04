import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class AddUmbrellaDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  last_maintenance_at: Date;
}
