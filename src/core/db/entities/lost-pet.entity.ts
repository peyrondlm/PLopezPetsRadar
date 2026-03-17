import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import type { Point } from "typeorm";

@Entity("lost_pets")
export class LostPet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

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
  owner_name!: string;

  @Column()
  owner_email!: string;

  @Column({ nullable: true })
  owner_phone?: string;

  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
    srid: 4326,
  })
  location!: Point;

  @Column({ nullable: true })
  address?: string;

  @Column({ type: "timestamptz" })
  lost_date!: Date;

  @Column({ default: true })
  is_active!: boolean;

  @Column({ type: "timestamptz", default: () => "NOW()" })
  created_at!: Date;

  @Column({ type: "timestamptz", default: () => "NOW()" })
  updated_at!: Date;
}