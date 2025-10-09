export class StationResponseDto {
  id: string;
  placeName: string;
  description: string;
  latitude: number;
  longitude: number;
  distanceMeters: number;
  availableUmbrellas: number;
  totalUmbrellas: number; // TODO: Change to capacity - represents station capacity limit
}
