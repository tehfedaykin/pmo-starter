import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

import { ListComponent } from './list/list.component';
import { OrderHistoryRoutingModule } from './order-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrderHistoryComponent } from './order-history.component';

@NgModule({
  declarations: [
    OrderHistoryComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    OrderHistoryRoutingModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    SharedModule
  ]
})
export class OrderHistoryModule { }
