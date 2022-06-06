import { BaseRepository } from './base.repository';
import { Model } from 'sequelize-typescript';
import { FindAndCountOptions, FindOptions } from 'sequelize';
import {
  ModelPayload,
  PaginatedSet,
  PaginationParams,
  ResultsWithCountSet,
} from './type';

export abstract class BaseCrudService<
  M extends Model = Model,
  T extends BaseRepository<M> = BaseRepository<M>,
> {
  protected constructor(public readonly repository: T) {}

  async findAll(options?: FindOptions<M>): Promise<PaginatedSet<M[]>> {
    const results: M[] = await this.repository.findAll(options);
    return <PaginatedSet<M[]>>{
      total: results.length,
      data: results,
    };
  }

  async findPaginated(
    paginationParams: PaginationParams,
    options?: FindAndCountOptions<M>,
  ): Promise<PaginatedSet<M[]>> {
    const { count: total, rows: data }: ResultsWithCountSet<M> =
      await this.repository.findPaginated(paginationParams, options);

    return <PaginatedSet<M[]>>{
      total,
      data,
    };
  }

  async findById(id: string): Promise<M> {
    return this.repository.findOneById(id);
  }

  async findOne(options?: FindOptions<M>): Promise<M> {
    return this.repository.findOne(options);
  }

  async create(payload: ModelPayload<M>): Promise<M> {
    return this.repository.create(payload);
  }

  async update(id: string, payload: ModelPayload<M>): Promise<M> {
    return this.repository.update(id, payload);
  }

  async remove(id: string | string[]): Promise<void> {
    return this.repository.remove(id);
  }
}
