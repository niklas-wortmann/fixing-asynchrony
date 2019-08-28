import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {appendEntries, clearTableData, renderTableFrame, renderTableRow} from './helpers/helper';
import {pagingOnScroll$} from './observables/scroll-paging';

renderTableFrame();

