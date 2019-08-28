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
import {
    aggregatePages,
    BeerPage,
    countPage,
    http$, initialAggregatedPages,
    initialPageCount,
    isScrolledDown,
    isScrolledUp
} from '../helpers/helper';

const scrollingElement$ = fromEvent(document, 'scroll')
    .pipe(

    );

const scrollDown$ = scrollingElement$.pipe(

);

const scrollUp$ = scrollingElement$.pipe(

);

export const pagingOnScroll$ = merge(scrollDown$, scrollUp$).pipe(
 
);
