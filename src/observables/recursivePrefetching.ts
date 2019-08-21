import {EMPTY, Observable} from 'rxjs';
import {BeerPage, generateNextUrl} from '../helper';
import {ajax} from 'rxjs/ajax';
import {expand, map} from 'rxjs/operators';

const get = (url: string): Observable<{
    content: BeerPage,
    next: string | null
}> =>  {
    return ajax.get(url).pipe(
        map(response => ({
            content: response.response,
            next: response.response.page.maxPage === response.response.page.currentPage ? null : generateNextUrl(url, response.response.page.currentPage + 1)
        })),
        // delay(1000)
    );
};

export const recursivePaginated$ = get('`http://localhost:8080/pagedBeer/0').pipe(
    expand(({ next }) => next ? get(next) : EMPTY),
    map(({ content }) => content.beers)
);
