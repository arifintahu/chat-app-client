import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../modules/views/register/register.component';
import { LoginComponent } from 'src/modules/views/login/login.component';
import { GroupComponent } from 'src/modules/views/group/group.component';
import { ChatComponent } from 'src/modules/views/chat/chat.component';

const routes: Routes = [
  { path : '', component : LoginComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'group', component : GroupComponent },
  { path : 'chat', component : ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
