import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFlower, IFlowerDTO } from '../../../server/src/types/flower';
import { BehaviorSubject, map, shareReplay, tap, withLatestFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlowerService {
  http = inject(HttpClient);


  flowers$$ = new BehaviorSubject<IFlower[]>([]);
  flowers$ = this.flowers$$.asObservable().pipe(
    // shareReplay(1)
  );

  init() {
    this.get().subscribe();
  }

  get() {
    return this.http.get<IFlower[]>(`/api/flower`).pipe(
      tap((flowers) => this.flowers$$.next(flowers))
    );
  }
  getById(id: IFlower['id']) {
    return this.http.get<IFlower>(`/api/flower/${id}`).pipe(
      withLatestFrom(this.flowers$),
      map(([flower, flowers]) => {
        const flowerIndex = flowers.findIndex((f) => f.id === flower.id);
        if (flowerIndex !== -1) {
          flowers[flowerIndex] = flower;
          this.flowers$$.next(flowers);
        }

        return flower;
      })
    );
  }

  add(flower: IFlowerDTO) {
    return this.http.post<IFlower>(`/api/flower`, flower).pipe(
      withLatestFrom(this.flowers$),
      map(([flower, flowers]) => {
        this.flowers$$.next([...flowers, flower]);
        return flower;
      })
    );
  }

  // ----


  waterFlower(id: IFlower['id'], waterLevel: IFlower["waterLevel"]) {
    return this.http.patch<IFlower>(`/api/flower/${id}`, { waterLevel }).pipe(
      withLatestFrom(this.flowers$),
      map(([flower, flowers]) => {
        const flowerIndex = flowers.findIndex((f) => f.id === flower.id);
        if (flowerIndex !== -1) {
          flowers[flowerIndex] = flower;
          this.flowers$$.next(flowers);
        }

        return flower;
      })
    );
  }


  seedFlowers() {
    return this.http.post<IFlower[]>(`/api/flower/seed`, {}).pipe(
      withLatestFrom(this.flowers$),
      map(([flowers, currentFlowers]) => {
        this.flowers$$.next([...currentFlowers, ...flowers]);
        return flowers;
      })
    );
  }

  trimFlowers() {
    return this.http.put<IFlower[]>(`/api/flower/trim`, {}).pipe(
      tap(flowers => {
        this.flowers$$.next(flowers);
      })
    );
  }

}
