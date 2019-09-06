import {delay, retryWhen, retry, tap, timeout, map} from 'rxjs/operators';
import {http$, IMPORTANT_URLS} from '../helpers/helper';
import {EMPTY, timer} from 'rxjs';

export const flaky$ = http$(IMPORTANT_URLS.FLAKY).pipe(
    timeout(500),
    // retry(2)
    retryWhen(errors =>
        errors.pipe(
            tap(val => console.log(`Value ${val} was too high!`)),
            delay(1000)
        )
    )
);
