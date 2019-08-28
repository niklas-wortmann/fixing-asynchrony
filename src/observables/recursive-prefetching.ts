import {EMPTY, Observable} from 'rxjs';
import {BeerPage, generateNextUrl, mapResponseToRecursiveBeerPage} from '../helpers/helper';
import {ajax} from 'rxjs/ajax';
import {expand, map} from 'rxjs/operators';

export interface RecuriveBeerPage {
    content: BeerPage;
    next: string | null;
}
