import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cities } from "./Cities";
import { Countries } from "./Countries";

// @Index("id_UNIQUE", ["id"], { unique: true })
@Index("name_UNIQUE", ["name"], { unique: true })
@Index("country_id", ["countryId"], {})
@Entity("districts", { schema: "trifinder_db" })
export class Districts {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 45 })
  name: string;

  @Column("int", { name: "country_id" })
  countryId: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Cities, (cities) => cities.district)
  cities: Cities[];

  @ManyToOne(() => Countries, (countries) => countries.districts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "country_id", referencedColumnName: "id" }])
  country: Countries;
}
