import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from '../reducers/invoice.reducer';
import { Invoice } from '../../models/invoice.model';

export const selectInvoiceState =
  createFeatureSelector<InvoiceState>('invoices');

export const selectAllInvoices = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.invoices
);

export const selectInvoiceError = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.error
);

export const selectInvoiceById = (id: string) =>
  createSelector(selectAllInvoices, (invoices: Invoice[]) =>
    invoices.find((invoice) => invoice.id === id)
  );
