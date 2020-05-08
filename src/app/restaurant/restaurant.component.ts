import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { RestaurantService, ResponseData, State, City } from './restaurant.service';
import { Restaurant } from './restaurant';

export interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
  public form: FormGroup;

  public restaurants$: Observable<Data<Restaurant>>;
  public states$: Observable<Data<State>>;
  public cities$: Observable<Data<City>>;

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit(): void {
    this.createForm();

    this.states$ = this.restaurantService.getStates().pipe(
      map((res: ResponseData<State>) => {
        return {
          value: res.data,
          isPending: false
        }
      }),
      startWith({
        value: [],
        isPending: true
      })
    );

    this.cities$ = this.form.get('state').valueChanges.pipe(
      switchMap((state) => {
        if (state) {
          return this.restaurantService.getCities(state).pipe(
            map((res: ResponseData<City>) => {
              return {
                value: res.data,
                isPending: false
              }
            })
          );
        } else {
          return of({
            value: [],
            isPending: false
          })
        }
      }),
      startWith({
        value: [],
        isPending: true
      })
    )

    this.restaurants$ = this.form.get('city').valueChanges.pipe(
      withLatestFrom(this.form.get('state').valueChanges),
      switchMap(([city, state]) => {
        if (city) {
          return this.restaurantService.getRestaurants(state, city).pipe(
            map((res: ResponseData<Restaurant>) => {
              return {
                value: res.data,
                isPending: false
              }
            })
          )
        } else {
          of({
            value: [],
            isPending: false
          })
        }
      }),
      startWith({
        value: [],
        isPending: true
      })
    )
  }

  createForm(): void {
    this.form = this.fb.group({
      state: {value: ''},
      city: {value: ''},
    });

  }

}
