import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesComponent } from '../pages/admin/categories/categories.component';
import { DashboardComponent } from '../pages/admin/dashboard/dashboard.component';
import { ProductComponent } from '../pages/admin/product/product.component';
import { ProductsComponent } from '../pages/admin/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
