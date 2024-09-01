import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Invoice } from '../../models/invoice.model';
import {
  deleteInvoice,
  updateInvoice,
} from '../../store/actions/invoice.actions';
import { selectInvoiceById } from '../../store/selectors/invoice.selectors';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit {
  invoice$: Observable<Invoice | null>;
  showDeleteModal: boolean = false;
  showEditModal: boolean = false;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoice$ = this.store
        .select(selectInvoiceById(id))
        .pipe(map((invoice) => invoice || null));
    } else {
      this.invoice$ = of(null);
      console.error('Invalid invoice ID');
    }
  }

  ngOnInit(): void {}

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  deleteInvoice(): void {
    this.invoice$
      .pipe(
        take(1),
        map((invoice) => {
          if (invoice) {
            this.store.dispatch(deleteInvoice({ id: invoice.id }));
            this.closeDeleteModal();
            this.router.navigate(['/']);
          } else {
            console.error('Invoice is undefined or missing.');
          }
        })
      )
      .subscribe();
  }

  openEditModal(): void {
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  onInvoiceUpdated(updatedInvoice: Invoice): void {
    this.store.dispatch(updateInvoice({ invoice: updatedInvoice }));
    this.closeEditModal();
  }

  markAsPaid(): void {
    this.invoice$.pipe(take(1)).subscribe((invoice) => {
      if (invoice) {
        const updatedInvoice: Invoice = { ...invoice, status: 'Paid' };
        this.store.dispatch(updateInvoice({ invoice: updatedInvoice }));
      } else {
        console.error('Invoice is undefined or missing.');
      }
    });
  }
}
