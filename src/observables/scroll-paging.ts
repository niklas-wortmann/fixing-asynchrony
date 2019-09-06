import {EMPTY, fromEvent, merge} from 'rxjs';
import {
    catchError,
    distinctUntilKeyChanged,
    exhaustMap,
    filter,
    map,
    mapTo,
    sampleTime,
    scan,
    startWith, tap,
} from 'rxjs/operators';
import {
    aggregatePages,
    BeerPage,
    countPage,
    http$, IMPORTANT_URLS, initialAggregatedPages,
    initialPageCount,
    isScrolledDown,
    isScrolledUp
} from '../helpers/helper';

const scrollingElement$ = fromEvent(document, 'scroll')
    .pipe(
        sampleTime(300),
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
    scan(countPage, initialPageCount),
    exhaustMap(({page}) =>
        http$(IMPORTANT_URLS.SCROLLING + page)
            .pipe(
                map((response) => response.response as BeerPage),
                catchError(x => EMPTY)
            )
        ),
    scan(aggregatePages, initialAggregatedPages),
    map(res => res.list)
    );
