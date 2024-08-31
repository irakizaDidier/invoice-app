import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Invoice } from '../../models/invoice.model';
import { deleteInvoice } from '../../store/actions/invoice.actions';
import { selectInvoiceById } from '../../store/selectors/invoice.selectors';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit {
  invoice$: Observable<Invoice | undefined>;
  showDeleteModal: boolean = false;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoice$ = this.store.select(selectInvoiceById(id));
    } else {
      this.invoice$ = of(undefined);
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
}
