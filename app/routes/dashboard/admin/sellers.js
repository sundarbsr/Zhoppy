import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SellerRoute extends Route {
  @service auth
  @service router;

  async model() {
    const users = await this.auth.getCredentials();
    return users.filter(user => user.role == "seller");
  }

  

  
}