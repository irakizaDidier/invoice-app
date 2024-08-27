import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { themeReducer } from './store/reducers/theme.reducer';
import { environment } from '../environment/environment';
import { HomeComponent } from './components/home/home.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, CreateInvoiceComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ theme: themeReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
