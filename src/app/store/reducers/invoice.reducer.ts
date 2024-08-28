import { createReducer, on } from '@ngrx/store';
import {
  loadInvoices,
  loadInvoicesSuccess,
  loadInvoicesFailure,
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
  on(loadInvoicesFailure, (state, { error }) => ({ ...state, error }))
);
