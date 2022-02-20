import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  PersonModel,
  Order,
} from '../models';
import {PersonModelRepository} from '../repositories';

export class PersonModelOrderController {
  constructor(
    @repository(PersonModelRepository) protected personModelRepository: PersonModelRepository,
  ) { }

  @get('/person-models/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of PersonModel has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.personModelRepository.orders(id).find(filter);
  }

  @post('/person-models/{id}/orders', {
    responses: {
      '200': {
        description: 'PersonModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PersonModel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInPersonModel',
            exclude: ['id'],
            optional: ['personModelId']
          }),
        },
      },
    }) order: Omit<Order, 'id'>,
  ): Promise<Order> {
    return this.personModelRepository.orders(id).create(order);
  }

  @patch('/person-models/{id}/orders', {
    responses: {
      '200': {
        description: 'PersonModel.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.personModelRepository.orders(id).patch(order, where);
  }

  @del('/person-models/{id}/orders', {
    responses: {
      '200': {
        description: 'PersonModel.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.personModelRepository.orders(id).delete(where);
  }
}
