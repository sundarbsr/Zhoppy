import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SellerEditProductRoute extends Route {
  @service products;

  model(params) {
    return this.products.getProductsById(params.id);
  }


  // setupController(controller, model) {
  //   super.setupController(controller, model);
  //   // If you want a deep copy
  //   controller.set('product', JSON.parse(JSON.stringify(model)));
  // }
}
