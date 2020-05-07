import { Order } from './order.service';
import { BehaviorSubject } from 'rxjs';

export interface NewOrderState {
  order: Order | null;
  processing: boolean;
  complete: boolean;
}

export interface OrderState {
  newOrder: NewOrderState;
  orders: Order[];
  ordersLoaded: boolean;
}

export class StateService {
  private intialOrderState: OrderState = {
    newOrder: {
      order: null,
      processing: false,
      complete: false
    },
    ordersLoaded: false,
    orders: []
  }

  private _orderState = new BehaviorSubject<OrderState>(this.intialOrderState);
  public readonly orderState$ = this._orderState.asObservable();

  get orderState(): OrderState {
    return this._orderState.getValue();
  }

  set orderState(state: OrderState) {
    this._orderState.next(state);
  }

  constructor() { }

  public startOrder(order) {
    const currentState = this.orderState;
    this.orderState = {
      ...currentState,
      newOrder: {
        ...currentState.newOrder,
        order,
        processing: true
      }
    }
  }

  public orderCompleted(order) {
    const currentState = this.orderState;
    this.orderState = {
      ...currentState,
      orders: [...currentState.orders, order],
      newOrder: {
        order,
        processing: false,
        complete: true
      }
    }
  }

  public resetNewOrder(){
    const currentState = this.orderState;
    this.orderState = {
      ...currentState,
      newOrder: {
        order: null,
        processing: false,
        complete: false
      }
    }
  }

  public ordersLoaded(orders: Order[]) {
    const currentState = this.orderState;
    this.orderState = {
      ...currentState,
      orders,
      ordersLoaded: true
    }
  }

  public orderUpdated(order: Order) {
    const currentState = this.orderState;
    const updatingOrders = [...currentState.orders];
    const orderToUpdate = updatingOrders.find(ord => ord._id === order._id);
    const indexOfOrder = updatingOrders.indexOf(orderToUpdate);
    updatingOrders[indexOfOrder] = order;

    this.orderState = {
      ...currentState,
      orders: updatingOrders
    }
  }

  public orderDeleted(orderId: string) {
    const currentState = this.orderState;
    const updatingOrders = [...currentState.orders];

    this.orderState = {
      ...currentState,
      orders: updatingOrders.filter(order => order._id !== orderId)
    }
  }
}
