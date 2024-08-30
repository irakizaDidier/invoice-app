import { createAction, props } from '@ngrx/store';
import { Invoice } from '../../models/invoice.model';

export const loadInvoices = createAction('[Invoice] Load Invoices');

export const loadInvoicesSuccess = createAction(
  '[Invoice] Load Invoices Success',
  props<{ invoices: Invoice[] }>()
);

export const loadInvoicesFailure = createAction(
  '[Invoice] Load Invoices Failure',
  props<{ error: string }>()
);

export const saveInvoice = createAction(
  '[Invoice] Save Invoice',
  props<{ invoice: Invoice }>()
);

export const saveInvoiceSuccess = createAction(
  '[Invoice] Save Invoice Success',
  props<{ invoice: Invoice }>()
);

export const saveInvoiceFailure = createAction(
  '[Invoice] Save Invoice Failure',
  props<{ error: string }>()
);
