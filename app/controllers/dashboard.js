import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DashboardController extends Controller {
  @service auth;
  @service router;

  @tracked currentView = 'index'; 

  @action
  setCurrentView(view) {
    this.currentView = view;
    this.router.transitionTo("dashboard.buyer.products");
  }
  
}