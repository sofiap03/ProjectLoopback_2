import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Order, OrderRelations, PersonModel, Product} from '../models';
import {PersonModelRepository} from './person-model.repository';
import {ProductRepository} from './product.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {

  public readonly personModel: BelongsToAccessor<PersonModel, typeof Order.prototype.id>;

  public readonly product: HasOneRepositoryFactory<Product, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonModelRepository') protected personModelRepositoryGetter: Getter<PersonModelRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Order, dataSource);
    this.product = this.createHasOneRepositoryFactoryFor('product', productRepositoryGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.personModel = this.createBelongsToAccessorFor('personModel', personModelRepositoryGetter,);
    this.registerInclusionResolver('personModel', this.personModel.inclusionResolver);
  }
}
