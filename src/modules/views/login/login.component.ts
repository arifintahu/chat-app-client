import { Input, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) { }
  username = '';
  password = '';

  async Login() {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method : 'POST',
        body : JSON.stringify({
          username : this.username,
          password : this.password
        }),
        headers : {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log(json);
      if (json.ok) {
        localStorage.setItem('user', JSON.stringify(json.data));
        this.router.navigate(['group']);
      } else {
        alert('Login invalid');
        this.router.navigate(['']);
      }
    } catch (e) {
      console.log(e);
    }
  }

  typeUsername(event: any) {
    this.username = event.target.value;
  }

  typePassword(event: any) {
    this.password = event.target.value;
  }
}
