import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProductCardComponent extends Component {

  @service router;
  @service products;

  @action 
  editProduct(id, event){
    event.stopPropagation();
    this.router.transitionTo('dashboard.seller.products.edit', id);
  }

  @action 
  deleteProduct(id, event){
    event.stopPropagation();
    this.products.deleteProduct(id);
    this.router.refresh();
  }

  @action
  goToDetails(product) {
      if (this.args.isSeller == true){
        this.router.transitionTo('dashboard.seller.products.details', product.id);
      }else{
        this.router.transitionTo('dashboard.buyer.products.details', product.id);
      }
      
  }

  get price() {
    return parseFloat(this.args.product["inventory-data"].price);
  }

  get discountPercent() {
    //return parseFloat(this.args.product["inventory-data"].discount.replace('%', ''));
    return parseFloat(this.args.product["inventory-data"].discount);
  }

  get discountedPrice() {
    const discounted = this.price * (1 - this.discountPercent / 100);
    return discounted.toFixed(2); // Keep 2 decimal places
  }

  get imageUrl() {
    console.log("this.args.product : ", this.args.product);
    return this.args.product["product-details"].image;
  }

  get brand() {
    return this.args.product["product-details"].brand;
  }
}
