import EmberRouter from '@ember/routing/router';
import config from 'assessment-3/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('signin');
  this.route('signup');
  this.route('dashboard', function() {
    this.route('buyer', function() {
      this.route('products');
      this.route("details", {path: '/details/:id'})
      this.route('cart');
    });
    this.route('seller', function(){
      this.route('my-products');
      this.route('add-product');
      this.route("details", {path: '/details/:id'})
      this.route('edit-product', { path: '/edit/:id' });
    });
    this.route('admin',function(){
      this.route('sellers');
    });
  });
});
