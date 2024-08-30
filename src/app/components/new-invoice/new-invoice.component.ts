import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { saveInvoice } from '../../store/actions/invoice.actions';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css'],
})
export class NewInvoiceComponent {
  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.invoiceForm = this.fb.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required],
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientStreetAddress: ['', Validators.required],
      clientCity: ['', Validators.required],
      clientPostCode: ['', Validators.required],
      clientCountry: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      paymentTerms: ['', Validators.required],
      projectDescription: ['', Validators.required],
    });
  }

  addItem() {}

  saveAsDraft() {
    if (this.invoiceForm.valid) {
      const invoice = this.invoiceForm.value as Invoice;
      this.store.dispatch(saveInvoice({ invoice }));
    } else {
      this.invoiceForm.markAllAsTouched();
    }
  }

  saveAndSend() {
    if (this.invoiceForm.valid) {
      const invoice = this.invoiceForm.value as Invoice;
      console.log('Invoice data being dispatched:', invoice);
      this.store.dispatch(saveInvoice({ invoice }));
    } else {
      this.invoiceForm.markAllAsTouched();
      console.log('Form is invalid, cannot dispatch invoice.');
    }
  }

  discard() {
    this.invoiceForm.reset();
  }
}
