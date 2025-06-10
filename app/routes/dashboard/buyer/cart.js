import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DetailsRoute extends Route {
  @service auth
  @service products;
  @service router;

  async model(params) {
    const user = await this.auth.getCurrentUsers();
    const products = await this.products.getProducts();
    const cart = user['purchase-data']?.cart ?? [];
    const productIds = cart.map(item => item.p_id);

    //const cartProducts = products.filter(product => productIds.includes(product.id));
    cart.forEach(item => {
       let product = products.find(product => product.id == item.p_id)
       item["product"] = product;
    });

    return cart;
  }

  setupController(controller,model) {
    controller.set("model",model);
  }
}