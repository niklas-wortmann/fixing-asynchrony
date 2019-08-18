import {timer, merge, Observable, EMPTY} from 'rxjs';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {delayWhen, retryWhen, tap, timeout, map, expand, concatMap, delay} from 'rxjs/operators';
import {BeerPage, generateNextUrl, renderTableFrame, renderTableRow} from './helper';

renderTableFrame();

const flaky$ = ajax.getJSON('http://localhost:8080/flaky').pipe(
    timeout(5000),
    // retry(2)
    retryWhen(errors =>
        errors.pipe(
            tap(val => console.log(`Value ${val} was too high!`)),
            delayWhen(val => timer( 10000))
        )
    )
);

export function get(url: string): Observable<{
    content: BeerPage,
    next: string | null
}> {
    return ajax.get(url).pipe(
        map(response => ({
            content: response.response,
            next: response.response.page.maxPage === response.response.page.currentPage ? null : generateNextUrl(url, response.response.page.currentPage + 1)
        })),
        // delay(1000)
    );
}

const paginated$ = get('http://localhost:8080/pagedBeer/0').pipe(
    expand(({ next }) => next ? get(next) : EMPTY),
    map(({ content }) => content.beers)
);


merge(paginated$).pipe(
    tap((val: any) => {
        console.log({val});
        val.forEach((v: any) => renderTableRow(v));
    }),
).subscribe();

