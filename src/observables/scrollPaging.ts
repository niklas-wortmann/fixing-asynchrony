import {fromEvent, merge} from 'rxjs';
import {
    distinctUntilKeyChanged,
    exhaustMap,
    filter,
    map,
    mapTo,
    sampleTime,
    scan,
    startWith,
    tap
} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

const http$ = (url: string) => {
    return ajax.get(url);
};

const scrollingElement$ = fromEvent(document, 'scroll')
    .pipe(
        filter((e: any) => !!e && !!e.target.scrollingElement),
        sampleTime(500),
        map((e: any) => e.target.scrollingElement)
    );

const scrollDown$ = scrollingElement$.pipe(
        filter((e: any) => e.scrollTop + e.clientHeight >= e.scrollHeight),
        mapTo({scrollDirection: 'DOWN'})
    );

const scrollUp$ = scrollingElement$.pipe(
        filter((e: any) => e.scrollTop === e.offsetTop),
        mapTo({scrollDirection: 'UP'})
    );

export const pagingOnScroll$ = merge(scrollDown$, scrollUp$).pipe(
    startWith({scrollDirection: 'DOWN'}),
    scan((acc, curr) => {
        if (curr.scrollDirection === 'UP') {
            return {...acc, ...curr, page: acc.page !== 0 ? acc.page - 1 : 0};
        } else {
            return {...acc, ...curr, page: acc.page + 1};
        }
    }, {scrollDirection: 'DOWN', position: 0, page: 0}),
    distinctUntilKeyChanged('page'),
    exhaustMap(({page}) =>
        http$(`http://localhost:8080/pagedBeer/${page}`)
            .pipe(map(response => response.response.beers))),
);
