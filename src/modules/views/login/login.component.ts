import { Input, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() loginForm : boolean;
  @Input() registerForm : boolean;
  constructor(private router: Router) { }
  firstname = '';
  lastname = '';
  username = '';
  password = '';

  ngOnInit(){
    this.loginForm = true;
    this.registerForm = false;
  }

  async Login() {
    try {
      const response = await fetch('http://chat-app-server-2.herokuapp.com/login', {
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

  Change(){
    this.loginForm = !this.loginForm;
    this.registerForm = !this.registerForm;
    this.username = '';
    this.password = '';
    this.firstname = '';
    this.lastname = '';
  }

  async submitRegister(){
    console.log(this.firstname, this.lastname, this.username, this.password);
    const response = await fetch('http://chat-app-server-2.herokuapp.com/users', {
      method : 'POST',
      body : JSON.stringify({
        firstname : this.username,
        lastname : this.lastname,
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
      alert("success");
    } else {
      alert(`${json.msg}`);
    }
  }

  typeFirstname(event: any) {
    this.firstname = event.target.value;
  }

  typeLastname(event: any) {
    this.lastname = event.target.value;
  }

  typeUsername(event: any) {
    this.username = event.target.value;
  }

  typePassword(event: any) {
    this.password = event.target.value;
  }
}
