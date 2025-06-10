import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProductsController extends Controller {

    @service auth;
    @service router;

    @action
    async approveSeller(user) {
        user['seller-data']['selling-approved'] = true;
        await this.auth.updateUsers(user.id, user); 
        alert(`${user.name} approved as seller`);
        this.router.refresh();
    }
}
