export class CreateFoundPetDto {
  species!: string;
  breed?: string;
  color?: string;
  size?: string;
  description?: string;
  photo_url?: string;
  finder_name!: string;
  finder_email!: string;
  finder_phone?: string;
  location!: { lat: number; lng: number };
  address?: string;
  found_date!: Date;
}