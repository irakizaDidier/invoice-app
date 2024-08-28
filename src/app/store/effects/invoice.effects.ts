import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import {
  loadInvoices,
  loadInvoicesSuccess,
  loadInvoicesFailure,
} from '../actions/invoice.actions';
import { Invoice } from '../../models/invoice.model';

@Injectable()
export class InvoiceEffects {
  private subscription: Subscription;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store
  ) {
    this.subscription = this.actions$.subscribe((action) => {
      if (action.type === loadInvoices.type) {
        this.http.get<Invoice[]>('assets/data/data.json').subscribe({
          next: (invoices) => {
            this.store.dispatch(loadInvoicesSuccess({ invoices }));
          },
          error: (error) => {
            this.store.dispatch(loadInvoicesFailure({ error: error.message }));
          },
        });
      }
    });
  }
}
