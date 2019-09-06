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

const scrollingElement$ = fromEvent(document, 'scroll');

const scrollDown$ = scrollingElement$;

const scrollUp$ = scrollingElement$;

export const pagingOnScroll$ = merge(scrollDown$, scrollUp$);
