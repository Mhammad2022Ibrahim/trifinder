import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("idtrip_UNIQUE", ["id"], { unique: true })
@Index("related_city", ["cityId"], {})
@Index("user_id", ["userId"], {})
@Entity("trips", { schema: "trifinder_db" })
export class Trips {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("int", { name: "city_id", nullable: true })
  cityId: number | null;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("longtext", { name: "description", nullable: true })
  description: string | null;

  @Column("int", { name: "nb_review", nullable: true, default: () => "'0'" })
  nbReview: number | null;

  @Column("float", {
    name: "average",
    nullable: true,
    precision: 12,
    default: () => "'0'",
  })
  average: number | null;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.trips, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
