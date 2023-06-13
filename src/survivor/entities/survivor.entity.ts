import { Gender } from '../gender.enum';
import { ApiProperty } from '@nestjs/swagger';
import { GeoLocation } from '../location';

export class Survivor {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  lastLocation: GeoLocation | null;

  @ApiProperty()
  infected: boolean;
}

// export const SurvivorSchema = z.object({
//   id: z.number().optional(),
//   name: z.string().nonempty(),
//   birthday: z.date(),
//   gender: z.nativeEnum(Gender),
//   lastLocation: z.string().optional(),
//   infected: z.boolean(),
// });

// export type Survivor = z.infer<typeof SurvivorSchema>;
