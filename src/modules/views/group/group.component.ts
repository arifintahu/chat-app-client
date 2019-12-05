import { Input, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @Input() name : string;
  groupname = '';
  constructor(private router: Router) { }
  ngOnInit() {
  	const user = JSON.parse(localStorage.getItem('user'));
  	this.name = user.lastname;
  }

  typeGroupname(event){
  	this.groupname = event.target.value;
  }

  async enterGroup() {
    try {
      const response = await fetch('http://localhost:3000/groups/enter', {
        method : 'POST',
        body : JSON.stringify({
          groupname : this.groupname
        }),
        headers : {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      if (json.ok) {
        localStorage.setItem('group', JSON.stringify(json.data));
        this.router.navigate(['chat']);
      } else {
      	alert('Group Name does not exist');
        this.router.navigate(['group']);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
