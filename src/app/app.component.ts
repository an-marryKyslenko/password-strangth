import { Component, OnInit } from '@angular/core';

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
  messege: string = ''

  calculatePasswordStrength() {
    if(this.password.length === 0){
      this.state = 'empty'
      this.passwordStrength = '';
    }else if (this.password.length < 8) {
      this.state = 'small';
      this.messege = 'Your password too small! Write at least 8 char'
    }else {
      this.state = 'valid'
      this.passwordStrength = 'easy'
      this.changeMessege(this.password)
      if (!this.containsOnlyLettersDigitsSymbols(this.password)) {
        this.passwordStrength = 'medium';
      }
      if (this.containsCombination(this.password)) {
        this.passwordStrength = 'strong';
        this.messege = 'Success! Your password is strong!!!'
      }
    }
  }

  containsOnlyLettersDigitsSymbols(password: string): boolean {
    let regex = /^[0-9]+$()|(^[a-zA-Z]+$)|(^[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$)/
    return regex.test(password);
  }
  changeMessege(password: string){
    if(/^[0-9]+$/.test(password)){
      this.messege = 'Try to add letters and digits!'
    }else if(/^[a-zA-Z]+$/.test(password)){
      this.messege = 'Try to add number and digits!'
    }else if(/^[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/.test(password)){
      this.messege = 'Try to add numbers and letters!'
    }else {
      this.messege = 'Try to add missing leters, number or digints!'
    }
  }

  containsCombination(password: string): boolean {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    const hasDigits = /\d/.test(password);

    return hasLetters && hasSymbols && hasDigits;
  }
}
