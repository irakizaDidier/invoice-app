import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  showNewItemFields: boolean = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.invoiceForm = this.fb.group({
      id: [this.generateUniqueId()],
      status: [''],
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
      paymentTerms: ['', Validators.required],
      paymentDue: ['', Validators.required],
      description: ['', Validators.required],
      items: this.fb.array([]),
    });
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items().push(this.createItem());
    this.showNewItemFields = true;
  }

  removeItem(index: number): void {
    this.items().removeAt(index);
    if (this.items().length === 0) {
      this.showNewItemFields = false;
    }
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }],
    });
  }

  updateTotal(index: number): void {
    const item = this.items().at(index);
    const quantity = item.get('quantity')?.value;
    const price = item.get('price')?.value;
    const total = quantity * price;
    item.get('total')?.setValue(total.toFixed(2), { emitEvent: false });
  }

  saveAsDraft() {
    if (this.invoiceForm.valid) {
      this.invoiceForm.patchValue({ status: 'draft' });
      const invoice = this.invoiceForm.value as Invoice;
      this.store.dispatch(saveInvoice({ invoice }));
    } else {
      this.invoiceForm.markAllAsTouched();
      console.log('Form is invalid:', this.invoiceForm.errors);
      this.logFormErrors(this.invoiceForm);
    }
  }

  saveAndSend() {
    if (this.invoiceForm.valid) {
      this.invoiceForm.patchValue({ status: 'pending' });
      const invoice = this.invoiceForm.value as Invoice;
      console.log('Invoice data being dispatched:', invoice);
      this.store.dispatch(saveInvoice({ invoice }));
    } else {
      this.invoiceForm.markAllAsTouched();
      console.log('Form is invalid, cannot dispatch invoice.');
      this.logFormErrors(this.invoiceForm);
    }
  }

  logFormErrors(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' +
              key +
              ', keyError: ' +
              keyError +
              ', error value: ',
            controlErrors[keyError]
          );
        });
      }
    });
  }

  discard() {
    this.invoiceForm.reset();
    this.invoiceForm.patchValue({ id: this.generateUniqueId() });
    this.showNewItemFields = false;
  }
}
