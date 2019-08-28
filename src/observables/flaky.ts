import {delay, retryWhen, retry, tap, timeout} from 'rxjs/operators';
import {http$} from '../helpers/helper';

export const flaky$ = http$('http://localhost:8080/flaky').pipe(
    timeout(5000),
    // retry(2)
    retryWhen(errors =>
        errors.pipe(
            tap(val => console.log(`Value ${val} was too high!`)),
            delay(1000)
        )
    )
);
