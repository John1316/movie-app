import { Pipe, PipeTransform } from '@angular/core';
import { movies } from '../models/movies';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(movies:movies[] , searchWord:string): any {
    if (searchWord == undefined) {
      return movies;
    }
      return movies.filter(function (movies) {
        return movies.name.toLowerCase().includes(searchWord.toLowerCase());
      });
  }
}
