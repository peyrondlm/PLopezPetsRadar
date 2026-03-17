import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import type { Point } from "typeorm";

@Entity("found_pets")
export class FoundPet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  species!: string;

  @Column({ nullable: true })
  breed?: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  size?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ nullable: true })
  photo_url?: string;

  @Column()
  finder_name!: string;

  @Column()
  finder_email!: string;

  @Column({ nullable: true })
  finder_phone?: string;

  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
    srid: 4326,
  })
  location!: Point;

  @Column({ nullable: true })
  address?: string;

  @Column({ type: "timestamptz" })
  found_date!: Date;

  @Column({ type: "timestamptz", default: () => "NOW()" })
  created_at!: Date;

  @Column({ type: "timestamptz", default: () => "NOW()" })
  updated_at!: Date;
}