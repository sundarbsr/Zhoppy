import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MyProductsRoute extends Route {
  @service auth
  @service products;
  @service router;

  async model() {
    const sellersProducts = await this.products.getProductsBySeller(this.auth.currentUserId);
    const availableProducts = sellersProducts.filter(product => product.status != "deleted");
    return availableProducts;
  }
}