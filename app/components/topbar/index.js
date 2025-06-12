import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SideBarComponent extends Component {
    
    @service auth;
    @service router;
    @tracked user = this.args.user;
    @tracked userInitial = this.user.name.charAt(0).toUpperCase();


    @action
    setView(view) {
        this.args.setCurrentView?.(view);
    }

    @action
    logOut(){
        this.auth.logout();
        this.router.transitionTo("signin")
    }

   
    get isSeller() {
        return (this.user.role == 'seller' && this.user["seller-data"]["selling-status"] == "Approved") ;
    }

    get isAdmin() {
        return this.user.role == 'admin';
    }



    

}