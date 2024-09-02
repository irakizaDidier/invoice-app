import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Invoice } from '../../models/invoice.model';
import { updateInvoice } from '../../store/actions/invoice.actions';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css'],
})
export class EditInvoiceComponent implements OnInit {
  @Input() invoice: Invoice | null = null;
  @Input() closeModal!: () => void;
  @Output() invoiceUpdated = new EventEmitter<Invoice>();
  invoiceForm: FormGroup;
  modalOpen: boolean = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.invoiceForm = this.fb.group({
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      senderAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      clientAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      items: this.fb.array([]), 
    });
  }

  ngOnInit(): void {
    if (this.invoice) {
      this.invoiceForm.patchValue(this.invoice);
      this.setItems(this.invoice.items);
    }
    this.openModal();
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  setItems(items: any[]): void {
    const itemFGs = items.map((item) =>
      this.fb.group({
        name: [item.name, Validators.required],
        quantity: [item.quantity, [Validators.required, Validators.min(1)]],
        price: [item.price, [Validators.required, Validators.min(0)]],
      })
    );
    const itemFormArray = this.fb.array(itemFGs);
    this.invoiceForm.setControl('items', itemFormArray);
  }
  openModal(): void {
    setTimeout(() => {
      this.modalOpen = true;
    }, 100);
  }

  addItem(): void {
    this.items.push(
      this.fb.group({
        name: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        price: [0, [Validators.required, Validators.min(0)]],
      })
    );
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onClose(): void {
    this.modalOpen = false;
    if (this.closeModal) {
      this.closeModal();
    }
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      const updatedInvoice: Invoice = {
        ...this.invoice,
        ...this.invoiceForm.value,
      };
      this.store.dispatch(updateInvoice({ invoice: updatedInvoice }));
      this.invoiceUpdated.emit(updatedInvoice);
      this.onClose();
    } else {
      console.log('Form is invalid');
    }
  }
}
