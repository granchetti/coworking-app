import { Office } from '../../domain/entities/office.entity';
import { OfficeResponseDto } from '../dtos/office-response.dto';

export function toOfficeRoomResponseDto(office: Office): OfficeResponseDto {
  return {
    id: office.id.getValue(),
    number: office.number.getValue(),
    leasePeriod: office.leasePeriod.getValue(),
    status: office.status.getValue(),
    createdAt: office.createdAt.toISOString(),
    updatedAt: office.updatedAt.toISOString(),
  };
}
