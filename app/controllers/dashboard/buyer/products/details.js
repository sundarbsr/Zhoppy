import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class BuyerProductsDetailsController extends Controller {
    constructor(...args){
        super(...args); 
    }

    // @service auth; 
    // @service router;

    // @action
    // async addToCart() {
    //     const productId = this.model.id;

    //     const user = await this.auth.getCurrentUsers(); 
    //     const cart = user['purchase-data']?.cart || [];

    //     const existingItem = cart.find((item) => item.p_id === productId);

    //     if (existingItem) {
    //      existingItem.count++;
    //     } else {
    //      cart.push({ p_id: productId, count: 1 });
    //     }

    //     if (user['purchase-data']) {
    //         user['purchase-data'].cart = cart;
    //       } else {
    //         user['purchase-data'] = { cart };
    //       }

    //     this.auth.updateUsers(user.id, user);
    //     this.router.transitionTo("dashboard.buyer.products")
    //     alert('Added to cart')
    // }


}