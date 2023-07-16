import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent as UserLoginComponent } from './pages/login/login.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

const routes: Routes = [
  { path: "", component: HomeComponent, data: { title: "Home" } },
  { path: "products/:categoryid", component: ProductsComponent, data: { title: "Products" } },
  { path: "about", component: AboutComponent, data: { title: "About" } },
  { path: "contact", component: ContactComponent, data: { title: "Contact" } },
  { path: "login", component: UserLoginComponent, data: { title: "Login" } },
  { path: "register", component: RegisterComponent, data: {title: "Register" }},
  // { path: "admin", children: [
  //   { path: "login", component: LoginComponent, data: { title: "Admin Login" } },
  //   { path: "dashboard", component: DashboardComponent, data: { title: "Admin Dashboard" }}
  // ]}
  { path: "admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
