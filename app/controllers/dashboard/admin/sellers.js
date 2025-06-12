import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProductsController extends Controller {

    @service auth;
    @service router;

    @action 
    async revokeSeller(user){
        user['seller-data']['selling-status'] = "Revoked";
        await this.auth.updateUsers(user.id, user); 
        alert(`${user.name} revoked from seller`);
        this.router.refresh();
    }

    @action
    async approveSeller(user) {
        user['seller-data']['selling-status'] = "Approved";
        await this.auth.updateUsers(user.id, user); 
        alert(`${user.name} approved as seller`);
        this.router.refresh();
    }
}
