import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './order/order.service';

@Pipe({
  name: 'orderTotal'
})
export class OrderTotalPipe implements PipeTransform {

  transform(value: Item[], ...args: unknown[]): number {
    return value.length ? value.reduce((accum, curr) => accum + curr.price, 0) : 0;
  }

}
