import {EMPTY, Observable} from 'rxjs';
import {BeerPage, generateNextUrl, mapResponseToRecursiveBeerPage} from '../helpers/helper';
import {ajax} from 'rxjs/ajax';
import {expand, map} from 'rxjs/operators';

export interface RecuriveBeerPage {
    content: BeerPage;
    next: string | null;
}

const get = (url: string): Observable<RecuriveBeerPage> =>  {
    return ajax.get(url).pipe(
        map((response) => mapResponseToRecursiveBeerPage(response, url)),
        // delay(1000)
    );
};

export const recursivePaginated$ = get('`http://localhost:8080/pagedBeer/0').pipe(
    expand(({ next }) => next ? get(next) : EMPTY),
    map(({ content }) => content.beers)
);
