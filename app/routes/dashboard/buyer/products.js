import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MyProductsRoute extends Route {
  @service auth
  @service products;
  @service router;

  async model() {
    const Products = await this.products.getProducts();
    const activeProducts = Products.filter(product => product.status == "visible");
    return activeProducts;
  }
}