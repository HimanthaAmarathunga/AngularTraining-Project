import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MediaItemService {
  constructor( private http: HttpClient) {}

  get(medium: any) {
    let getOptions = {
      params: { medium }
    };
    return this.http.get<MediaItemsResponse>('mediaitems', getOptions)
      .pipe(
        map((response: MediaItemsResponse) => {
          return response.mediaItems;
        }),
        catchError(this.handleError)
      );
  }
  
  add(mediaItem: any) {
    return this.http.post('mediaItems', mediaItem)
    .pipe(catchError(this.handleError));
  }
  
  delete(mediaItem: any) {
   return this.http.delete(`mediaitems/${mediaItem.id}`)
   .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError('A data error occoured, please try again.');
  }


      mediaItems = [
        {
          id: 1,
          name: 'John Wick',
          medium: 'Movie',
          category: 'Action',
          year: 2017,
          watchedOn: null,
          isFavorite: false,
        },
        {
          id: 2,
          name: 'F9',
          medium: 'Movie',
          category: 'Action',
          year: 2021,
          watchedOn: null,
          isFavorite: true,
        },
        {
          id: 3,
          name: 'Friends',
          medium: 'Series',
          category: 'Comedy',
          year: 1994,
          watchedOn: 12 / 12 / 2017,
          isFavorite: true,
        },
      ];
}

interface MediaItemsResponse {
  mediaItems: MediaItem[]
}

interface MediaItem {
  id: number;
  name: string;
  medium: string;
  category: string;
  year: number;
  watchedOn: number;
  isFavorite: boolean;
}

