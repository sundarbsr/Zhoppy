import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SigninController extends Controller {
  @service auth;
  @service router;
  @tracked email = '';
  @tracked password = '';
  @tracked error = null;

  @action
  async login(event) {
    event.preventDefault();
    const success = this.auth.login(this.email, this.password);
    if (success) {
      this.router.transitionTo('dashboard.buyer.products');
    } else {
      this.error = 'Invalid email or password';
      
    }
  }
}