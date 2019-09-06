import {EMPTY, interval, timer} from 'rxjs';
import {catchError, map, switchMap, switchMapTo, tap} from 'rxjs/operators';
import {http$, IMPORTANT_URLS} from '../helpers/helper';

export const polling$ = EMPTY;
