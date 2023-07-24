import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ProductsComponent } from './pages/products/products.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductvarietiesComponent } from './pages/admin/productvarieties/productvarieties.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { MainComponent } from './components/admin/main/main.component';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    BreadcrumbsComponent,
    ProductsComponent,
    PaginationComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    ProductComponent,
    ProductvarietiesComponent,
    OrdersComponent,
    MainComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Title, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
