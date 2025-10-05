import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationTag } from '../database/entities/station-tag.entity';
import { Station } from '../database/entities/station.entity';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);
  private tagRepository: Repository<StationTag>;

  constructor(
    @InjectRepository(StationTag)
    private readonly stationTagRepository: Repository<StationTag>,
  ) {
    this.tagRepository = stationTagRepository;
  }

  /**
   * Busca la estación asociada a un tag NFC.
   * @param tagUid UID único del tag NFC (ej: "08:9B:39:BB")
   * @returns La estación asociada o null si no existe.
   */
  async getStationByTag(tagUid: string): Promise<Station | null> {
    try {
      const tag = await this.tagRepository.findOne({
        where: { tag_uid: tagUid },
        relations: ['station'],
      });

      if (!tag) {
        this.logger.warn(`Tag no encontrado: ${tagUid}`);
        return null;
      }

      if (!tag.station) {
        this.logger.warn(
          `El tag ${tagUid} no está vinculado a ninguna estación.`,
        );
        return null;
      }

      return tag.station;
    } catch (error) {
      this.logger.error(
        `Error al buscar estación por tag ${tagUid}`,
        error instanceof Error ? error.stack : String(error),
      );
      return null;
    }
  }
}
