import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/admin/login/login.component';
import { DashboardComponent } from '../pages/admin/dashboard/dashboard.component';
import { CategoriesComponent } from '../pages/admin/categories/categories.component';
import { ProductsComponent } from '../pages/admin/products/products.component';
import { ProductComponent } from '../pages/admin/product/product.component';
import { OrdersComponent } from '../pages/admin/orders/orders.component';
import { MainComponent } from '../components/admin/main/main.component';
import { ProductvarietiesComponent } from '../pages/admin/productvarieties/productvarieties.component';

const routes: Routes = [
  { path: "", component: MainComponent, children: [
    { path: "login", component: LoginComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "categories", component: CategoriesComponent },
    { path: "products", component: ProductsComponent },
    { path: "product", component: ProductComponent },
    { path: "product/:id", component: ProductComponent },
    { path: "product/varieties/:id", component: ProductvarietiesComponent },
    { path: "orders", component: OrdersComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
