import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SellerProductsAddController extends Controller {
  @service auth;
  @service products;
  @service router;

  @tracked newProduct = {
    "seller-id": this.auth.currentUserId,
    name: '',
    'product-details': {
      image: '',
      brand: '',
      category: '',
      color: '',
      detials: '',
    },
    'inventory-data': {
      price: 0,
      discount: 0,
      count: 0,
    },
    'status': "visible",
  };

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
    const value = event.target.value;
    this.newProduct = {
      ...this.newProduct,
      'inventory-data': {
        ...this.newProduct['inventory-data'],
        [field]: parseInt(value) || 0,
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
      console.log('Submitting:', this.newProduct);
      await this.products.addProduct(this.newProduct);
      this.router.transitionTo('dashboard.seller.products');
    } catch (error) {
      alert('Error while submitting product.');
      console.error(error);
    }
  }
}