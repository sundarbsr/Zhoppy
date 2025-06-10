import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SideBarComponent extends Component {
    
    get currentView() {
        return this.args.currentView;
    }

    get isSeller() {
        return this.currentView === 'seller';
    }

    get isAdmin() {
        return this.currentView === 'admin';
    }

}