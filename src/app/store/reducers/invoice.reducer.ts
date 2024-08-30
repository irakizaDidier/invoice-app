// invoice.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  loadInvoices,
  loadInvoicesSuccess,
  loadInvoicesFailure,
  saveInvoice,
  saveInvoiceSuccess,
  saveInvoiceFailure,
} from '../actions/invoice.actions';
import { Invoice } from '../../models/invoice.model';

export interface InvoiceState {
  invoices: Invoice[];
  error: string | null;
}

export const initialState: InvoiceState = {
  invoices: [],
  error: null,
};

export const invoiceReducer = createReducer(
  initialState,
  on(loadInvoices, (state) => ({ ...state, error: null })),
  on(loadInvoicesSuccess, (state, { invoices }) => ({ ...state, invoices })),
  on(loadInvoicesFailure, (state, { error }) => ({ ...state, error })),
  on(saveInvoice, (state) => ({ ...state, error: null })),
  on(saveInvoiceSuccess, (state, { invoice }) => ({
    ...state,
    invoices: [...state.invoices, invoice],
  })),
  on(saveInvoiceFailure, (state, { error }) => ({ ...state, error }))
);
