import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ImageUrlPipe } from './image-url.pipe';
import { DetailComponent } from './restaurant/detail/detail.component';
import { OrderComponent } from './order/order.component';
import { MenuItemsComponent } from './order/menu-items/menu-items.component';
import { OrderTotalPipe } from './order-total.pipe';
import { HistoryComponent } from './order/history/history.component';
import { ListComponent } from './order/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantComponent,
    ImageUrlPipe,
    DetailComponent,
    OrderComponent,
    MenuItemsComponent,
    OrderTotalPipe,
    HistoryComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [ImageUrlPipe, OrderTotalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
