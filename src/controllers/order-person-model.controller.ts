import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Order,
  PersonModel,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderPersonModelController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/person-model', {
    responses: {
      '200': {
        description: 'PersonModel belonging to Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PersonModel)},
          },
        },
      },
    },
  })
  async getPersonModel(
    @param.path.string('id') id: typeof Order.prototype.id,
  ): Promise<PersonModel> {
    return this.orderRepository.personModel(id);
  }
}
