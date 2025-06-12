import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CartController extends Controller {

      @service auth;
      @service router;

      get price(){
        let total = 0;
        this.model.forEach(item => {
          total += item.product["inventory-data"].price;
        });
        return total;
      }

      get discount(){
        let total = 0;
        this.model.forEach(item => {
          total += (item.product["inventory-data"].price / 100 * item.product["inventory-data"].discount) ;
        });
        return total;
      }

      get total(){
        return this.price - this.discount;
      }

      // calculateItemTotal(item) {
      //   const price = item.product['inventory-data'].price;
      //   const discount = item.product['inventory-data'].discount || 0;
      //   const discountedPrice = Math.round(price - (price * discount / 100));
      //   return discountedPrice * item.count;
      // }

      @action
      toProductsPage(product){
        this.router.transitionTo("dashboard.buyer.details", product.id)
      }

      @action
      discountedPrice(price, discountPercent) {
        const discounted = price * (1 - discountPercent / 100);
        return discounted.toFixed(2); 
      }

      @action
      async removeProduct(id, event){
        event.stopPropagation();
        let user = await this.auth.getCurrentUsers();
        let cart = user["purchase-data"].cart;
        let removedCart = cart.filter(item => item.p_id != id);
        user["purchase-data"].cart = removedCart;

        await this.auth.updateUsers(user.id, user);
        this.router.refresh();
      }
    
      // get totalAmount() {
      //   return this.model.reduce((sum, item) => {
      //     const price = item.product['inventory-data'].price;
      //     const discount = item.product['inventory-data'].discount || 0;
      //     const discountedPrice = Math.round(price - (price * discount / 100));
      //     return sum + (discountedPrice * item.count);
      //   }, 0);
      // }
      


}