import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reviews } from "./Reviews";
import { Trips } from "./Trips";
import { Cities } from "./Cities";

@Index("related_city", ["cityId"], {})
@Entity("users", { schema: "trifinder_db" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", length: 150 })
  username: string;

  @Column("varchar", { name: "email", nullable: true, length: 150 })
  email: string | null;

  @Column("int", { name: "age", nullable: true })
  age: number | null;

  @Column("int", { name: "gender", nullable: true })
  gender: number | null;

  @Column("int", { name: "city_id", nullable: true })
  cityId: number | null;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Reviews, (reviews) => reviews.user)
  reviews: Reviews[];

  @OneToMany(() => Trips, (trips) => trips.user)
  trips: Trips[];

  @ManyToOne(() => Cities, (cities) => cities.users, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
  city: Cities;
}
