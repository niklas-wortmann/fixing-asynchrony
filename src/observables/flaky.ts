import {ajax} from 'rxjs/ajax';
import {delayWhen, retryWhen, tap, timeout} from 'rxjs/operators';
import {timer} from 'rxjs';

export const flaky$ = ajax.getJSON('http://localhost:8080/flaky').pipe(
    timeout(5000),
    // retry(2)
    retryWhen(errors =>
        errors.pipe(
            tap(val => console.log(`Value ${val} was too high!`)),
            delayWhen(val => timer( 10000))
        )
    )
);
