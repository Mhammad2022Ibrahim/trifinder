import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Districts } from "./Districts";

@Index("id_UNIQUE", ["id"], { unique: true })
@Index("name_UNIQUE", ["name"], { unique: true })
@Entity("countries", { schema: "trifinder_db" })
export class Countries {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 100 })
  name: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Districts, (districts) => districts.country)
  districts: Districts[];
}
