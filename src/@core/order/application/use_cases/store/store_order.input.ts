import { IsNotEmpty, IsString, validateSync } from 'class-validator';

export type StoreTransactionInputConstructorProps = {
  description: string;
};

export class StoreOrderInput {
  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(props: StoreTransactionInputConstructorProps) {
    this.description = props.description;
  }
}

export class ValidateOrderInput {
  static validate(input: StoreOrderInput) {
    return validateSync(input);
  }
}
