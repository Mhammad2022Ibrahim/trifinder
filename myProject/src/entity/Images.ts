import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// @Index("idimage_UNIQUE", ["id"], { unique: true })
@Index("name_UNIQUE", ["name"], { unique: true })
@Index("related_index", ["relatedType"], {})
@Index("related_id", ["relatedId"], {})
@Entity("images", { schema: "trifinder_db" })



export class Images {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 150 })
  name: string;

  @Column("blob", { name: "image", nullable: true })
  image: Buffer | null;

  @Column("int", { name: "related_id" })
  relatedId: number;

  @Column("int", {
    name: "related_type",
    nullable: true,
    comment: "1:countries,2:cities,3:attractions,4:trips",
  })
  relatedType: number | null;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;
}
