import { Entity } from '../entities/entity';
import { ValueObject } from '../value-objects/value-object.vo';
import { InputParams } from './input-params';
import { OutputParams } from './output-params';

export interface BaseRepositoryInterface<
  TEntity extends Entity,
  TEntityId extends ValueObject,
  TFilter = string,
  TInput = InputParams<TFilter>,
  TOutput = OutputParams,
> {
  sortableFields: string[];

  index(props: TInput): Promise<TOutput>;
  store(entity: TEntity): Promise<void>;
  show(entity_id: TEntityId): Promise<TEntity | null>;
  update(entity: TEntity): Promise<void>;
  delete(entity_id: TEntityId): Promise<void>;

  get entity(): new (...args: any[]) => TEntity;
}

export interface SearchableRepositoryInterface<
  TEntity extends Entity,
  TEntityId extends ValueObject,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult,
> extends BaseRepositoryInterface<TEntity, TEntityId> {
  sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}

export type SortDirection = 'asc' | 'desc';

export type SearchParamsConstructorProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams<Filter = string> extends ValueObject {
  protected _page: number;
  protected _per_page: number = 15;
  protected _sort: string | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: Filter | null;

  constructor(props: SearchParamsConstructorProps<Filter> = {}) {
    super(props);

    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }

  get page(): number {
    return this._page;
  }

  private set page(value: number) {
    let _page = +value;

    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page)
      _page = 1;

    this._page = _page;
  }

  get per_page(): number {
    return this._per_page;
  }

  private set per_page(value: number) {
    let _per_page = value === (true as any) ? this._per_page : +value;

    if (
      Number.isNaN(_per_page) ||
      _per_page <= 0 ||
      parseInt(_per_page as any) !== _per_page
    )
      _per_page = this._per_page;

    this._per_page = _per_page;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  get sort_dir(): SortDirection | null {
    return this._sort_dir;
  }

  private set sort_dir(value: SortDirection | null) {
    if (!this.sort) {
      this._sort_dir = null;
      return;
    }

    const dir = `${value}`.toLowerCase();

    this._sort_dir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir;
  }

  get filter(): Filter | null {
    return this._filter;
  }

  protected set filter(value: Filter | null) {
    this._filter =
      value === null || value === undefined || (value as unknown) === ''
        ? null
        : (`${value}` as any);
  }

  public validate(): void {
    throw new Error('Method not implemented.');
  }
}

type SearchResultConstructorProps<TEntity extends Entity> = {
  items: TEntity[];
  total: number;
  current_page: number;
  per_page: number;
};

export class SearchResult<TEntity extends Entity = Entity> extends ValueObject {
  readonly items: TEntity[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;

  constructor(props: SearchResultConstructorProps<TEntity>) {
    super(props);

    this.items = props.items;
    this.total = props.total;
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = Math.ceil(this.total / this.per_page);
  }

  toJSON(forceAggregate = false) {
    return {
      items: forceAggregate
        ? this.items.map((item) => item.toJSON())
        : this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: this.last_page,
    };
  }

  public validate(): void {
    throw new Error('Method not implemented.');
  }
}
