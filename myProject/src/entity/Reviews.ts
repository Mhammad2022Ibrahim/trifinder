import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

// @Index("idreview_UNIQUE", ["id"], { unique: true })
@Index("relation_id", ["relatedType"], {})
@Index("related_id", ["relatedId"], {})
@Index("user_id", ["userId"], {})
@Entity("reviews", { schema: "trifinder_db" })
export class Reviews {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("float", {
    name: "average",
    nullable: true,
    precision: 12,
    default: () => "'0'",
  })
  average: number | null;

  @Column("int", {
    name: "related_type",
    nullable: true,
    comment: "1:cities,2:attractions,3:trips",
  })
  relatedType: number | null;

  @Column("int", { name: "related_id" })
  relatedId: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.reviews, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
