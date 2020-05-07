import { Component, OnInit, Input } from '@angular/core';
import { Order, OrderService } from '../order.service';


@Component({
  selector: 'pmo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  @Input() orders: Order[];
  @Input() listTitle: string;
  @Input() status: string;
  @Input() statusTitle: string;
  @Input() action: string;
  @Input() actionTitle: string;
  @Input() emptyMessage: string;

  constructor(private orderService: OrderService) { }

  ngOnInit() {}

  public markAs(order: Order, action: string): void {
    this.orderService.updateOrder(order, action).subscribe();
  }

  public delete(id: string): void {
    this.orderService.deleteOrder(id).subscribe()
  }

}
