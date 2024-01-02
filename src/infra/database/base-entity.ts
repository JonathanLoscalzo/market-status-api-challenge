import {
  BaseEntity,
  BaseEntityAuditable,
  SoftDeleteBaseEntity,
} from '../../core/interfaces/base-entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export type Id = string;

export abstract class UuidEntity implements BaseEntity<Id> {
  // @PrimaryColumn()
  // @Generated('uuid') // always use uuid version 4
  @PrimaryGeneratedColumn('uuid')
  id?: Id;
}

export abstract class EntityAuditable implements BaseEntityAuditable<Id> {
  // @PrimaryColumn()
  // @Generated('uuid') // always use uuid version 4
  @PrimaryGeneratedColumn('uuid')
  id?: Id;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @VersionColumn()
  version: number;

  // TODO: change it with subscribers when users were created.
  // @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  // createdBy: string;

  // @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  // updatedBy: string;
}

export abstract class EntityAuditableSoft
  extends EntityAuditable
  implements SoftDeleteBaseEntity<Id>
{
  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  deletedBy: string;

  @DeleteDateColumn()
  deleteAt?: Date;
}
