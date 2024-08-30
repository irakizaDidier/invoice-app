import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { loadInvoices } from '../../store/actions/invoice.actions';
import {
  selectAllInvoices,
  selectInvoiceError,
} from '../../store/selectors/invoice.selectors';
import { Invoice } from '../../models/invoice.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  invoices$: Observable<Invoice[]>;
  filteredInvoices$: Observable<Invoice[]>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.invoices$ = this.store.select(selectAllInvoices);
    this.filteredInvoices$ = this.invoices$;
    this.error$ = this.store.select(selectInvoiceError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadInvoices());
  }

  onFilterApplied(filteredInvoices: Invoice[]) {
    this.filteredInvoices$ = of(filteredInvoices);
  }

  goToInvoiceDetails(id: string): void {
    this.router.navigate(['/invoice', id]);
  }
}
