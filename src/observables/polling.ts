import {EMPTY, timer} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {http$} from '../helpers/helper';

export const polling$ = timer(0, 1000).pipe(
    switchMap(() => http$('http://localhost:8080/flaky').pipe(
        catchError(() => EMPTY)
    ))
);
