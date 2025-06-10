import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProductDetailsComponent extends Component {
    
    @service auth; 
    @service products;
    @service router;

    @tracked quantity = 1;

    get listCount() {
        let max = this.args.product["inventory-data"].count || 10; 
        let arr = [];
        for (let i = 1; i <= max; i++) {
          arr.push(i);
        }
        return arr;
    }

    @action
    selectCount(event){
        const value = event.target.value;
        this.quantity = value;
    }

    @action 
    editProduct(){
        this.router.transitionTo('dashboard.seller.edit-product', this.args.product.id);
    }

    @action 
    deleteProduct(){
        this.products.deleteProduct(this.args.product.id);
        this.router.transitionTo('dashboard.seller.my-products');
        this.router.refresh();
    }

    @action
    async addToCart() {
        const productId = this.args.product.id;

        const user = await this.auth.getCurrentUsers(); 
        const cart = user['purchase-data']?.cart || [];

        const existingItem = cart.find((item) => item.p_id === productId);

        if (existingItem) {
         existingItem.count += this.quantity;
        } else {
         cart.push({ p_id: productId, count: this.quantity });
        }

        if (user['purchase-data']) {
            user['purchase-data'].cart = cart;
        } else {
            user['purchase-data'] = { cart };
        }

        this.auth.updateUsers(user.id, user);
        this.router.transitionTo("dashboard.buyer.products")
        alert('Added to cart')
    }

}