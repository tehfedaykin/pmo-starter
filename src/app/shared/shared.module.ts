import { NgModule } from '@angular/core';
import { OrderTotalPipe } from './order-total.pipe';



@NgModule({
  declarations: [
    OrderTotalPipe
  ],
  imports: [
  ],
  exports: [
    OrderTotalPipe
  ],
  providers: [OrderTotalPipe]
})
export class SharedModule { }
