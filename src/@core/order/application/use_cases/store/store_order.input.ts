import { IsNotEmpty, IsString, validateSync } from 'class-validator';

export type StoreTransactionInputConstructorProps = {
  description: string;
};

export class StoreOrderInput {
  @IsString()
  @IsNotEmpty()
  private _description: string;

  constructor(props: StoreTransactionInputConstructorProps) {
    this._description = props.description;
  }

  get description(): string {
    return this._description;
  }
}

export class ValidateOrderInput {
  static validate(input: StoreOrderInput) {
    return validateSync(input);
  }
}
