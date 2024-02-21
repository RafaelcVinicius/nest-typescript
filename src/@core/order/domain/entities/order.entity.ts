import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo';
import { Entity } from '../../../@shared/domain/entities/entity';

export type OrderEntityCreateProps = {
  id?: number;
  public_id?: string;
  description: string;
};

export type OrderEntityConstructorProps = {
  id?: number;
  public_id?: string;
  description: string;
};

export class OrderEntity extends Entity {
  private _id?: number;
  private _public_id: Uuid;
  private _description: string;

  constructor(props: OrderEntityConstructorProps) {
    super();

    this._description = props.description;
    this._public_id = new Uuid(props.public_id);
    this._id = props.id;
  }

  static create(props: OrderEntityCreateProps) {
    return new this(props);
  }

  get id(): number {
    return this._id;
  }

  get public_id(): Uuid {
    return this._public_id;
  }

  get description(): string {
    return this._description;
  }

  toJSON() {
    return {
      id: this._id,
      public_id: this._public_id.value,
      description: this._description,
    };
  }
}
