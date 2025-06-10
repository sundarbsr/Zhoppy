import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DashboardSellerEditProductController extends Controller {
  @service router;
  @service products;

  @tracked newProduct = structuredClone(this.model);

  constructor() {
    super(...arguments);
  }

  @action
  isCategory(value){
    return this.newProduct["product-details"].category == value
  }

  @action
  isColor(value){
    return this.newProduct["product-details"].color == value
  }

  @action
  isVisible(value){
    return this.newProduct.status == value
  }

  @action
  updateField(field, event) {
    this.newProduct = {
      ...this.newProduct,
      [field]: event.target.value,
    };
  }

  @action
  updateProductDetail(field, event) {
    this.newProduct = {
      ...this.newProduct,
      'product-details': {
        ...this.newProduct['product-details'],
        [field]: event.target.value,
      },
    };
  }

  @action
  updateInventoryData(field, event) {
    this.newProduct = {
      ...this.newProduct,
      'inventory-data': {
        ...this.newProduct['inventory-data'],
        [field]: parseInt(event.target.value) || 0,
      },
    };
  }

  @action
  updateVisibility(event) {
    const value = event.target.value;
    this.newProduct = {
      ...this.newProduct,
      'status': value,
    };
  }

  @action
  async submitProduct(event) {
    event.preventDefault();

    try {
      await this.products.updateProduct(this.newProduct.id, this.newProduct);
      this.router.transitionTo('dashboard.seller.my-products');
    } catch (err) {
      console.error(err);
      alert('Failed to update product');
    }
  }
}
