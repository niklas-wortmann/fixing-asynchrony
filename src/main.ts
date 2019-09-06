import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {appendEntries, clearTableData, renderTableData, renderTableFrame, renderTableRow, renderPagedDate, renderEverythingElse} from './helpers/helper';
import {pagingOnScroll$} from './observables/scroll-paging';
import {polling$} from './observables/polling';
import {flaky$} from './observables/flaky';

renderTableFrame();

flaky$.subscribe();
