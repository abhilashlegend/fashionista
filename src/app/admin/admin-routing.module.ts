import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/admin/login/login.component';
import { DashboardComponent } from '../pages/admin/dashboard/dashboard.component';

const routes: Routes = [{
  path: "login", component: LoginComponent
},{
  path: "dashboard", component: DashboardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
