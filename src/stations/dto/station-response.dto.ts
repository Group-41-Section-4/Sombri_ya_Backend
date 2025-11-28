export class StationResponseDto {
  id: string;
  placeName: string;
  description: string;
  // URL stored in the database (`image_url` column on `Station`)
  latitude: number;
  longitude: number;
  distanceMeters: number;
  availableUmbrellas: number;
  totalUmbrellas: number; // TODO: Change to capacity - represents station capacity limit
}
