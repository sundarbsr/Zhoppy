import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SignupController extends Controller {
  @service auth;
  @service router;
  @tracked password = "";
  @tracked passwordVerified = false;
  @tracked companyname = '';
  @tracked username = '';
  @tracked usernameError = null;
  @tracked email = '';
  @tracked emailError = null;
  @tracked error = null;
  @tracked role = "buyer";
  @tracked isSeller = false;

  updatePassword = (newPassword) => {
    this.password = newPassword;
  }

  updatePasswordVerification = (newValue) => {
    this.passwordVerified = newValue;
  }

  @action
  handleToggle(event) {
    const isChecked = event.target.checked;

    if (!isChecked) {
      this.role = "buyer";
      this.isSeller = false;
    }else{
      this.role = "seller";
      this.isSeller = true;
    }
    
  }

  @action
  async signup(event) {
    event.preventDefault();

    // Validate email and password through the components
    console.log("this.passwordVerified", this.passwordVerified);
    if (this.passwordVerified == true) {
      if (this.auth.isUserExist(this.username)){
        this.error = 'Provided Username Already Exists';
      }else if (this.auth.isEmailExist(this.email)){
        this.error = 'Provided Email Already Exists';
      }else{
        if (this.role == "seller"){
          this.auth.signup(this.companyname, this.companyname, this.email, this.password, this.role);
          alert("Requested Permission for Selling");
        }else{
          this.auth.signup(this.username, this.companyname, this.email, this.password, this.role);
        }
        this.router.transitionTo('dashboard.buyer.products');
        
      }
    } else {
      this.error = 'Please complete all fields correctly';
      event.preventDefault();
    }
  }


}