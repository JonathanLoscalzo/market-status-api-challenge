import { FindOneOptions, FindOptionsWhere } from 'typeorm';

export interface IBaseService<T, G> {
  getAll(): Promise<T[]>;
  get(id: G): Promise<T>;
  findOneBy(filter: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T>;
  findOne(options: FindOneOptions<T>): Promise<T>;
  // findAll(query: PaginateQuery): Promise<Paginated<T>>;
  create(entity: T): Promise<T>;
  update(id: G, entity: Omit<Partial<T>, 'id'>): Promise<T>;
  delete(id: G): Promise<any>;
  softDelete(id: G): Promise<any>;
  softRemove(entity: T): Promise<any>;
  restore(id: G): Promise<any>;
}
