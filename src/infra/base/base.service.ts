import { Injectable } from '@nestjs/common';
import {
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { BaseEntity } from '../../core/interfaces/base-entity';
import { ServiceException } from '../../core/exceptions/service.exception';
import { IBaseService } from 'src/core/interfaces/base.service';

@Injectable()
export class BaseService<T extends BaseEntity<G>, G>
  implements IBaseService<T, G>
{
  constructor(private readonly genericRepository: Repository<T>) {}

  async findOneBy(
    filter: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T> {
    return this.genericRepository.findOneByOrFail(filter);
  }

  async findBy(
    filter: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.genericRepository.findBy(filter);
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    return this.genericRepository.findOneOrFail(options);
  }

  async create(entity: T | G): Promise<T> {
    try {
      return await this.genericRepository.save(entity as T);
    } catch (error) {
      throw new ServiceException(error);
    }
  }

  async save(entity: T): Promise<T> {
    try {
      return await this.genericRepository.save(entity);
    } catch (error) {
      throw new ServiceException(error);
    }
  }

  async getAll(): Promise<T[]> {
    try {
      return <Promise<T[]>>this.genericRepository.find();
    } catch (error) {
      throw new ServiceException(error);
    }
  }

  async get(id: G): Promise<T> {
    try {
      return <Promise<T>>(
        this.genericRepository.findOneByOrFail({ id: id as any })
      );
    } catch (error) {
      throw new ServiceException(error);
    }
  }

  async update(id: G, entity: Omit<Partial<T | any>, 'id'>): Promise<T> {
    try {
      const result: UpdateResult = await this.genericRepository.update(
        id as any,
        entity as any,
      );
      return <Promise<T>>(
        (result?.affected &&
          this.genericRepository.findOneByOrFail({ id: id as any }))
      );
    } catch (error) {
      throw new ServiceException(error);
    }
  }

  async delete(id: G) {
    try {
      return this.genericRepository.delete({ id: id as any });
    } catch (error) {
      throw new ServiceException(error);
    }
  }

  async softDelete(id: G) {
    try {
      const entity = await this.genericRepository.findOneOrFail({
        where: { id: id as any },
      });
      return this.genericRepository.softRemove(entity);
    } catch (error) {
      throw new ServiceException(error);
    }
  }

  async softRemove(entity: T): Promise<any> {
    try {
      return this.genericRepository.softRemove(entity);
    } catch (error) {
      throw new ServiceException(error);
    }
  }

  async restore(id: G) {
    try {
      return this.genericRepository.restore({ id: id as any });
    } catch (error) {
      throw new ServiceException(error);
    }
  }
}
