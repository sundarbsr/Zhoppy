import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DashboardRoute extends Route {
  @service auth;
  @service router;

  async model() {
    const currentUser = await this.auth.getCurrentUsers()
    return currentUser;
  }
}