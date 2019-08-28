import {fromEvent, merge} from 'rxjs';
import {
    distinctUntilKeyChanged,
    exhaustMap,
    filter,
    map,
    mapTo,
    sampleTime,
    scan,
    startWith, tap,
} from 'rxjs/operators';
import {aggregatePages, BeerPage, countPage, http$, isScrolledDown, isScrolledUp} from '../helpers/helper';

const scrollingElement$ = fromEvent(document, 'scroll')
    .pipe(
        filter((e: any) => !!e && !!e.target.scrollingElement),
        sampleTime(500),
        map((e: any) => e.target.scrollingElement)
    );

const scrollDown$ = scrollingElement$.pipe(
    filter(isScrolledDown),
    mapTo({scrollDirection: 'DOWN'})
);

const scrollUp$ = scrollingElement$.pipe(
    filter(isScrolledUp),
    mapTo({scrollDirection: 'UP'})
);

export const pagingOnScroll$ = merge(scrollDown$, scrollUp$).pipe(
    startWith({scrollDirection: 'DOWN'}),
    scan(countPage, {scrollDirection: 'DOWN', page: 0}),
    distinctUntilKeyChanged('page'),
    exhaustMap(({page}) =>
        http$(`http://localhost:8080/pagedBeer/${page}`)
            .pipe(map((response) => response.response as BeerPage))),
    scan(aggregatePages, {list: [], page: 0}),
    map(pages => pages.list)
);
