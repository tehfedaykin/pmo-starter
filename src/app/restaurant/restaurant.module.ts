import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { RestaurantComponent } from './restaurant.component';
import { DetailComponent } from './detail/detail.component';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { ImageUrlPipe } from './image-url.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuItemsComponent } from './order/menu-items/menu-items.component';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    RestaurantComponent,
    DetailComponent,
    OrderComponent,
    ImageUrlPipe,
    MenuItemsComponent
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    SharedModule
  ],
  providers: [
    ImageUrlPipe
  ],
})
export class RestaurantModule { }
