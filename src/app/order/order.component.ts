import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { RestaurantService } from '../restaurant/restaurant.service';
import { Restaurant } from '../restaurant/restaurant';
import { OrderService, Item } from './order.service';
import { switchMap, map, startWith, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderTotalPipe } from '../order-total.pipe';
import { NewOrderState } from './state.service';


function minLengthArray(min: number) {
  return (c: AbstractControl): { [key: string]: any } => {
    return c.value?.length >= min ? null : { minLengthArray: { valid: false } };
  }
}

@Component({
  selector: 'pmo-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  public restaurant$: Observable<Restaurant | {}>;
  orderTotal$: Observable<number>;
  public orderState$: Observable<NewOrderState>;
  public restaurantId: string;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private orderTotalPipe: OrderTotalPipe
  ) {
  }

  ngOnInit(): void {
    this.restaurant$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.restaurantService.getRestaurant(params.get('slug'));
      }),
      startWith({}),
      tap((val: Restaurant) => this.restaurantId = val._id)
    );

    this.orderForm = this.formBuilder.group({
      restaurant: [null],
      name: [null],
      address: [null],
      phone: [null],
      items: [[], minLengthArray(1)]
    });

    this.orderTotal$ = this.orderForm.get('items').valueChanges.pipe(
      map((items: Item[]) => this.orderTotalPipe.transform(items)),
      startWith(0.0)
    );

    this.orderState$ = this.orderService.orderState$.pipe(map((state) => state.newOrder));
  }

  onSubmit(): void {
    const order = {
      ...this.orderForm.value,
      restaurant: this.restaurantId
    };
    this.orderService.createOrder(order).subscribe();
  }

  startNewOrder(): void {
    this.orderService.resetNewOrder();
    this.orderForm.reset();
    this.orderForm.get('items').setValue([]);
  }
}
