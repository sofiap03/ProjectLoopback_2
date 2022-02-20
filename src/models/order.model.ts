import {belongsTo, Entity, model, property, hasOne} from '@loopback/repository';
import {PersonModel} from './person-model.model';
import {Product} from './product.model';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_product: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  state: number;

  @belongsTo(() => PersonModel)
  personModelId: string;

  @hasOne(() => Product)
  product: Product;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
