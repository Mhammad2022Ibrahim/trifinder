import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attractions } from "./Attractions";
import { Districts } from "./Districts";
import { Users } from "./Users";

// @Index("idcity_UNIQUE", ["id"], { unique: true })
@Index("IDX_f8c0858628830a35f19efdc0ec", ["name"], { unique: true })
@Index("district_id", ["districtId"], {})
@Entity("cities", { schema: "trifinder_db" })
export class Cities {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 100 })
  name: string;

  @Column("float", {
    name: "average_review",
    nullable: true,
    precision: 12,
    default: () => "'0'",
  })
  averageReview: number | null;

  @Column("int", { name: "nb_review", nullable: true, default: () => "'0'" })
  nbReview: number | null;

  @Column("double", {
    name: "longitude",
    nullable: true,
    precision: 10,
    scale: 6,
    default: () => "'0.000000'",
  })
  longitude: number | null;

  @Column("double", {
    name: "latitude",
    nullable: true,
    precision: 10,
    scale: 6,
    default: () => "'0.000000'",
  })
  latitude: number | null;

  @Column("int", { name: "district_id", nullable: true })
  districtId: number | null;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Attractions, (attractions) => attractions.city)
  attractions: Attractions[];

  @ManyToOne(() => Districts, (districts) => districts.cities, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "district_id", referencedColumnName: "id" }])
  district: Districts;

  @OneToMany(() => Users, (users) => users.city)
  users: Users[];
}
