import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PasswordValidatorComponent extends Component {
  
  @tracked password = '';
  @tracked showConfirm = false;
  @tracked passwordMatch = false;
  @tracked passwordError = null;
  @tracked isValid = false;

  get hasMinLength() {
    return this.password.length >= 5;
  }

  get hasUppercase() {
    return /[A-Z]/.test(this.password);
  }

  get hasLowercase() {
    return /[a-z]/.test(this.password);
  }

  get hasDigit() {
    return /\d/.test(this.password);
  }

  get hasSpecialChar() {
    return /[^A-Za-z0-9]/.test(this.password);
  }

  @action
  validatePassword(event) {
    let valueData = event.target.value; 

    this.args.updatePassword?.(valueData);

    console.log("value : ", event.data);
    this.password = valueData;
    this.passwordError = null;
    
    if (valueData.length === 0) {
      this.showConfirm = false;
      return;
    }

    const hasUppercase = /[A-Z]/.test(valueData);
    const hasLowercase = /[a-z]/.test(valueData);
    const hasDigit = /\d/.test(valueData);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(valueData);
    this.isValid = valueData.length >= 5 && hasUppercase && hasLowercase && hasDigit && hasSpecialChar;

    if (this.isValid) {
      this.showConfirm = true;
    } else {
      this.showConfirm = false;
    }

  }

  @action
  validateConfirmPassword(event) {
    let value = event.target.value;
    if (value === this.password) {
      this.args.updatePasswordVerification?.(true);
      this.passwordMatch = true;
    }  
  }
}