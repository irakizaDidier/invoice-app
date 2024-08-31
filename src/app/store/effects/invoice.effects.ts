import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  loadInvoices,
  loadInvoicesSuccess,
  loadInvoicesFailure,
  saveInvoice,
  saveInvoiceSuccess,
  saveInvoiceFailure,
  deleteInvoice,
  deleteInvoiceSuccess,
  deleteInvoiceFailure,
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
    this.subscription = this.handleLoadInvoices();
    this.subscription.add(this.handleSaveInvoice());
    this.subscription.add(this.handleDeleteInvoice());
  }

  private handleLoadInvoices(): Subscription {
    return this.actions$
      .pipe(
        ofType(loadInvoices),
        mergeMap(() =>
          this.http.get<Invoice[]>('assets/data/data.json').pipe(
            map((invoicesFromJson) => {
              const storedInvoices = localStorage.getItem('invoices');
              let combinedInvoices: Invoice[] = invoicesFromJson;

              if (storedInvoices) {
                const invoicesFromStorage: Invoice[] =
                  JSON.parse(storedInvoices);
                combinedInvoices = [
                  ...invoicesFromJson,
                  ...invoicesFromStorage,
                ];
              }
              return loadInvoicesSuccess({ invoices: combinedInvoices });
            }),
            catchError((error) =>
              of(loadInvoicesFailure({ error: error.message }))
            )
          )
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  private handleSaveInvoice(): Subscription {
    return this.actions$
      .pipe(
        ofType(saveInvoice),
        map((action) => {
          const invoice = (action as any).invoice as Invoice;
          let invoices: Invoice[] = [];

          const storedInvoices = localStorage.getItem('invoices');
          if (storedInvoices) {
            invoices = JSON.parse(storedInvoices);
          }

          invoices.push(invoice);
          localStorage.setItem('invoices', JSON.stringify(invoices));

          return saveInvoiceSuccess({ invoice });
        }),
        catchError((error) => of(saveInvoiceFailure({ error: error.message })))
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  private handleDeleteInvoice(): Subscription {
    return this.actions$
      .pipe(
        ofType(deleteInvoice),
        map((action) => {
          const id = (action as any).id as string;
          let invoices: Invoice[] = [];

          const storedInvoices = localStorage.getItem('invoices');
          if (storedInvoices) {
            invoices = JSON.parse(storedInvoices);
          }

          invoices = invoices.map((invoice) =>
            invoice.id === id ? { ...invoice, deleted: true } : invoice
          );
          localStorage.setItem('invoices', JSON.stringify(invoices));

          return deleteInvoiceSuccess({ id });
        }),
        catchError((error) =>
          of(deleteInvoiceFailure({ error: error.message }))
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }
}
