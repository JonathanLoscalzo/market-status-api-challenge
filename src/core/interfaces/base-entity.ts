export interface BaseEntity<T> {
  id?: T;
}

export interface SoftDeleteBaseEntity<T> extends BaseEntityAuditable<T> {
  deletedAt?: Date;
}

export interface BaseEntityAuditable<T> extends BaseEntity<T>, IExtraInfo {}

export interface IExtraInfo {
  // createdBy: string;
  // updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
