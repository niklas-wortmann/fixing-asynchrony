import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {renderTableFrame, renderTableRow} from './helper';
import {recursivePaginated$} from './observables/recursivePrefetching';
import {pagingOnScroll$} from './observables/scrollPaging';

renderTableFrame();


merge(pagingOnScroll$).pipe(
    tap((val: any) => {
        console.log({val});
        val.forEach((v: any) => renderTableRow(v));
    }),
).subscribe();

// Pagination mit Scrolling
// Websocket with optimistic update
