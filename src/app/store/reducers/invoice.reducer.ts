import { createReducer, on } from '@ngrx/store';
import {
  loadInvoices,
  loadInvoicesSuccess,
  loadInvoicesFailure,
  saveInvoice,
  saveInvoiceSuccess,
  saveInvoiceFailure,
  deleteInvoiceSuccess,
  deleteInvoiceFailure,
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
  on(loadInvoicesSuccess, (state, { invoices }) => ({
    ...state,
    invoices: invoices.filter((invoice) => !invoice.deleted),
  })),
  on(loadInvoicesFailure, (state, { error }) => ({ ...state, error })),
  on(saveInvoice, (state) => ({ ...state, error: null })),
  on(saveInvoiceSuccess, (state, { invoice }) => ({
    ...state,
    invoices: [...state.invoices, invoice],
  })),
  on(saveInvoiceFailure, (state, { error }) => ({ ...state, error })),
  on(deleteInvoiceSuccess, (state, { id }) => ({
    ...state,
    invoices: state.invoices.map((invoice) =>
      invoice.id === id ? { ...invoice, deleted: true } : invoice
    ),
  })),
  on(deleteInvoiceFailure, (state, { error }) => ({ ...state, error }))
);
