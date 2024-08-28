import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectAllInvoices } from '../../store/selectors/invoice.selectors';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent {
  dropdownOpen = false;
  filters = {
    paid: false,
    pending: false,
    draft: false,
  };

  invoices$: Observable<Invoice[]>;
  invoicesCount$: Observable<number>;

  @Output() filteredInvoices = new EventEmitter<Invoice[]>();
  @Output() filteredInvoicesCount = new EventEmitter<number>();

  constructor(private store: Store) {
    this.invoices$ = this.store.select(selectAllInvoices);
    this.invoicesCount$ = this.invoices$.pipe(
      map((invoices) => invoices.length)
    );
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  filterInvoices() {
    this.invoices$
      .pipe(
        map((invoices) => {
          const { paid, pending, draft } = this.filters;
          if (!paid && !pending && !draft) {
            this.filteredInvoicesCount.emit(invoices.length);
            return invoices;
          }
          const filteredInvoices = invoices.filter((invoice) => {
            return (
              (paid && invoice.status === 'paid') ||
              (pending && invoice.status === 'pending') ||
              (draft && invoice.status === 'draft')
            );
          });
          this.filteredInvoicesCount.emit(filteredInvoices.length);

          return filteredInvoices;
        })
      )
      .subscribe((filteredInvoices) => {
        this.filteredInvoices.emit(filteredInvoices);
      });
  }
}
