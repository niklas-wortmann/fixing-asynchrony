import {EMPTY, timer} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {http$} from '../helpers/helper';

export const polling$ = EMPTY;
