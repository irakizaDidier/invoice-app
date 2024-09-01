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

export const deleteInvoice = createAction(
  '[Invoice] Delete Invoice',
  props<{ id: string }>()
);
export const deleteInvoiceSuccess = createAction(
  '[Invoice] Delete Invoice Success',
  props<{ id: string }>()
);
export const deleteInvoiceFailure = createAction(
  '[Invoice] Delete Invoice Failure',
  props<{ error: string }>()
);

export const updateInvoice = createAction(
  '[Invoice] Update Invoice',
  props<{ invoice: Invoice }>()
);

export const updateInvoiceSuccess = createAction(
  '[Invoice] Update Invoice Success',
  props<{ invoice: Invoice }>()
);

export const updateInvoiceFailure = createAction(
  '[Invoice] Update Invoice Failure',
  props<{ error: string }>()
);
