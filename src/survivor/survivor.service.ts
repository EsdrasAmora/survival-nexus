import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { UpdateSurvivorDto } from './dto/update-survivor.dto';
import { PaginatedSurvivor } from './entities/paginated-survivor';
import { createSurvivor, findManySurvivors, updateSurvivor } from './survivor.generated-queries';
import { PaginatedSurvivorDto } from './dto/list-survivors.dto';

@Injectable()
export class SurvivorService {
  constructor() {
    //inject PG here
  }

  async create(input: CreateSurvivorDto) {
    const [survivor] = await createSurvivor.run(
      {
        ...input,
        lastLocation: { x: input.lastLocation.lat, y: input.lastLocation.lng },
      },
      {} as any,
    );
    if (!survivor) {
      throw new InternalServerErrorException('Error creating survivor');
    }
    //remove others from query
    return survivor.id;
  }

  async list({ cursorId, limit }: PaginatedSurvivorDto): Promise<PaginatedSurvivor> {
    const survivors = await findManySurvivors.run({ cursorId, limit }, {} as any);
    return {
      total: survivors[0]?.total ?? 0,
      survivors: survivors.map((it) => ({
        ...it,
        lastLocation: it.lastLocation && { lat: it.lastLocation.x, lng: it.lastLocation.y },
      })),
    };
  }

  async update(survivorId: number, input: UpdateSurvivorDto) {
    await updateSurvivor.run(
      {
        ...input,
        survivorId,
        lastLocation: input.lastLocation && { x: input.lastLocation.lat, y: input.lastLocation.lng },
      },
      {} as any,
    );
  }
}
// findOne and delete are unecessary
