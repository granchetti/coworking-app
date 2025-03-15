import { HotDesk } from '../../domain/entities/hotdesk.entity';
import { HotDeskResponseDto } from '../dtos/hotdesk-response.dto';

export function toHotDeskResponseDto(hotDesk: HotDesk): HotDeskResponseDto {
  return {
    id: hotDesk.id.getValue(),
    number: hotDesk.number.getValue(),
    status: hotDesk.status.getValue(),
    createdAt: hotDesk.createdAt.toISOString(),
    updatedAt: hotDesk.updatedAt.toISOString(),
  };
}
