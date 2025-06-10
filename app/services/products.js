import Service from '@ember/service';
import config from 'assessment-3/config/environment'
import { tracked } from '@glimmer/tracking';

export default class ProductsService extends Service {
  @tracked products = [];
  @tracked url = "https://" + config.APP.usersApiKey + ".mockapi.io";
  

  constructor() {
    super(...arguments);
    console.log("usersApiKey : ", config.APP.userApiKey );
    this.getProducts();
  }

  async getProducts(){
    try {
        let getProductssUrl = `${this.url}/products`;
        const response = await fetch(getProductssUrl);
        const data = await response.json();
        this.products = data;
        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
  }

  async getProductsBySeller(id){
    try {
        let data = await this.getProducts();
        return data.filter(product => product["seller-id"] == id);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
  }

  async getProductsById(id){
    try {
        let data = await this.getProducts();
        return data.find(product => product["id"] == id);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
  }

  async addProduct(product) {
    let setProductUrl = `${this.url}/products`;
    const response = await fetch(setProductUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
  
    return await response.json();
  }

  async updateProduct(id, product) {
    let setProductUrl = `${this.url}/products/${id}`;
    const response = await fetch(setProductUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
  
    return await response.json();
  }

  async deleteProduct(id) {

    // let setProductUrl = `${this.url}/products/${id}`;
    // const response = await fetch(setProductUrl, {
    //   method: 'DELETE',
    //   headers: { 'Content-Type': 'application/json' }
    // });
  
    // if (!response.ok) {
    //   throw new Error('Failed to update product');
    // }
    // this.getProducts();
    // return await response.json();

    try {
      let product = await this.getProductsById(id);
      product.status = "deleted"
      this.updateProduct(id, product);
    } catch (error) {
      console.error("Error Deleting products:", error);
    }
    
  }

  
}


  