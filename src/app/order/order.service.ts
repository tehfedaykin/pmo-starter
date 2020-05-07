import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StateService } from './state.service';
import { tap } from 'rxjs/operators';
import { ResponseData } from '../restaurant/restaurant.service';
import { Observable } from 'rxjs';

export interface Item {
  name: string;
  price: number;
}

export interface Order {
  _id: string;
  name: string;
  address: string;
  phone: string;
  status: string;
  items: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService extends StateService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getOrders(): Observable<ResponseData<Order>> {
    return this.httpClient.get(environment.apiUrl + '/orders').pipe(
      tap((res: ResponseData<Order>) => this.ordersLoaded(res.data))
    );
  }

  createOrder(order: Order): Observable<Order> {
    this.startOrder(order);
    const orderData = {
      ...order,
      status: 'new'
    };
    return this.httpClient.post(environment.apiUrl + '/orders', orderData).pipe(
      tap((res: Order) => this.orderCompleted(res))
    );
  }

  updateOrder(order: Order, action: string): Observable<Order> {
    const orderData = {
      ...order,
      status: action
    };
    return this.httpClient.put(environment.apiUrl + '/orders/' + orderData._id, orderData).pipe(
      tap((res: Order) => this.orderUpdated(res))
    );
  }

  deleteOrder(id: string): Observable<Order> {
    return this.httpClient.delete(environment.apiUrl + '/orders/' + id).pipe(
      tap((res: Order) => this.orderDeleted(res._id))
    );
  }
}
