import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderService } from '../order.service';
import { OrderState } from '../state.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'pmo-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent implements OnInit {
  public orderState$: Observable<OrderState>;

  constructor(
    private orderService: OrderService,
    private socket: Socket
  ) {}

  ngOnInit(): void {
    this.orderState$ = this.orderService.orderState$;
    this.orderService.getOrders().subscribe();

    this.socket.on('orders created', (order: Order) => {
      this.orderService.orderCompleted(order);
    });

    this.socket.on('orders updated', (order: Order) => {
     this.orderService.orderUpdated(order);
    });

    this.socket.on('orders removed', (order: Order) => {
     this.orderService.orderDeleted(order._id);
    });
  }

  filter(orders: Order[], status: string): Order[] {
    return orders.filter(order => order.status === status);
  }
}
