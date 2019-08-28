import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {appendEntries, clearTableData, renderTableFrame, renderTableRow} from './helpers/helper';
import {pagingOnScroll$} from './observables/scroll-paging';

renderTableFrame();


merge(pagingOnScroll$).pipe(
    tap(clearTableData),
    tap(appendEntries),
).subscribe();

// Pagination mit Scrolling
// Websocket with optimistic update
