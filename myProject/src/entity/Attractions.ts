import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cities } from "./Cities";

@Index("idattraction_UNIQUE", ["id"], { unique: true })
@Index("city_id", ["cityId"], {})
@Index("attraction_type", ["attractionType"], {})
@Entity("attractions", { schema: "trifinder_db" })
export class Attractions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 150 })
  name: string;

  @Column("int", {
    name: "attraction_type",
    comment: "1:restaurant,2:historical monuments",
  })
  attractionType: number;

  @Column("int", { name: "nb_review", nullable: true, default: () => "'0'" })
  nbReview: number | null;

  @Column("float", {
    name: "average",
    nullable: true,
    precision: 12,
    default: () => "'0'",
  })
  average: number | null;

  @Column("int", { name: "city_id", nullable: true })
  cityId: number | null;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Cities, (cities) => cities.attractions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
  city: Cities;
}
