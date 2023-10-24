import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'password-strength';
  password: string = '';
  state: string = 'empty'
  passwordStrength: string = '';
  message: string = ''

  calculatePasswordStrength() {
    if(this.password.length === 0){
      this.state = 'empty'
      this.passwordStrength = '';
    }else if (this.password.length < 8) {
      this.state = 'small';
      this.message = 'Your password is too small! Write at least 8 character!'
    }else {
      this.state = 'valid'
      this.passwordStrength = 'easy'
      this.changeMessage(this.password)
      if (!this.containsOnlyLettersDigitsSymbols(this.password)) {
        this.passwordStrength = 'medium';
      }
      if (this.containsCombination(this.password)) {
        this.passwordStrength = 'strong';
        this.message = 'Success! Your password is strong!!!'
      }
    }
  }

  containsOnlyLettersDigitsSymbols(password: string): boolean {
    let regex = /^[0-9]+$()|(^[a-zA-Z]+$)|(^[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$)/
    return regex.test(password);
  }
  changeMessage(password: string){
    if(/^[0-9]+$/.test(password)){
      this.message = 'Try to add letters and symbols!'
    }else if(/^[a-zA-Z]+$/.test(password)){
      this.message = 'Try to add number and symbols!'
    }else if(/^[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/.test(password)){
      this.message = 'Try to add numbers and letters!'
    }else {
      this.message = 'Try to add missing letters, numbers or symbols!'
    }
  }

  containsCombination(password: string): boolean {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    const hasDigits = /\d/.test(password);

    return hasLetters && hasSymbols && hasDigits;
  }
}
