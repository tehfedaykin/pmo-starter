import { Component, OnInit } from '@angular/core';
import { ImageUrlPipe } from 'src/app/restaurant/image-url.pipe';
import { Observable } from 'rxjs';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'pmo-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  public restaurant$: Observable<{
    value: Restaurant;
    isLoading: boolean;
  }>;

  constructor(
    private imageUrlPipe: ImageUrlPipe,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.restaurant$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.restaurantService.getRestaurant(params.get('slug')).pipe(
          map((res) => {
            return {
              value: res,
              isLoading: false
            }
          })
        )
      }),
      startWith({
        value: null,
        isLoading: true
      })
    )
  }

  getUrl(image:string): string {
    return this.imageUrlPipe.transform(image);
  }

}
