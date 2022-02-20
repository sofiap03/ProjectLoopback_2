import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PersonModel, PersonModelRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class PersonModelRepository extends DefaultCrudRepository<
  PersonModel,
  typeof PersonModel.prototype.id,
  PersonModelRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof PersonModel.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(PersonModel, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
