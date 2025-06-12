import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BuyerProductDetailsRoute extends Route {
  @service auth
  @service products;
  @service router;

  async model(params) {
    const Products = await this.products.getProductsById(params.id);
    return Products;
  }

  setupController(controller,model) {
    controller.set("model",model);
  }
}