import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';

import { environment } from '../environment/environment';
import { themeReducer } from './store/reducers/theme.reducer';
import { invoiceReducer } from './store/reducers/invoice.reducer';
import { InvoiceEffects } from './store/effects/invoice.effects';
import { CapitalizePipe } from './Pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CreateInvoiceComponent,
    CapitalizePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      theme: themeReducer,
      invoices: invoiceReducer,
    }),
    EffectsModule.forRoot([InvoiceEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
