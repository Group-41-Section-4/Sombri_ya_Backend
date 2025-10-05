import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Station } from '../database/entities/station.entity';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  // ✅ Endpoint: GET /tags/:tag_uid/station
  @Get(':tag_uid/station')
  async getStationByTag(@Param('tag_uid') tagUid: string): Promise<Station> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const station = await this.tagsService.getStationByTag(tagUid);

    if (!station) {
      throw new NotFoundException(
        `No se encontró una estación asociada al tag ${tagUid}`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return station;
  }
}
