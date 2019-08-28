import {ajax} from 'rxjs/ajax';

export const renderTableFrame = () => {
    document.getElementById('table-container').innerHTML = `
        <table class="striped highlight" id="table">
            <tr>
                <td>Name</td>
                <td>Style</td>
                <td>Yeast</td>
                <td>Hop</td>
                <td>Malt</td>
            </tr>
        </table>
    `;
};

export const renderTableRow = (data: any) => {
    const tableRowElement = document.createElement('tr');
    tableRowElement.className += ' table-data';
    tableRowElement.appendChild(renderTableData(data.name));
    tableRowElement.appendChild(renderTableData(data.style));
    tableRowElement.appendChild(renderTableData(data.yeast));
    tableRowElement.appendChild(renderTableData(data.hop));
    tableRowElement.appendChild(renderTableData(data.malt));
    document.getElementById('table').appendChild(tableRowElement);
};

export const renderTableData = (data: any) => {
    const tableData = document.createElement('td');
    tableData.innerHTML = data;
    return tableData;
};

export const clearTableData = () => {
    const rows = document.getElementsByClassName('table-data');
    for (var i = rows.length - 1; i >= 0; --i) {
        rows[i].remove();
    }
};

export interface BeerPage {

    beers: Array<Beer>;
    page: {
        currentPage: number;
        maxPage: number;
    };

}

export interface Beer {
    hop: string;
    malt: string;
    name: string;
    style: string;
    yeast: string;
}

export const generateNextUrl = (url: string, page: number) => {
    const parsedUrlArray = url.split('/');
    parsedUrlArray.pop();
    let parsedUrl = parsedUrlArray.join('/');
    parsedUrl += '/' + page;
    return parsedUrl;
};

export const mapResponseToRecursiveBeerPage = (response: any, url: string) => ({
    content: response.response,
    next: response.response.page.maxPage === response.response.page.currentPage ? null : generateNextUrl(url, response.response.page.currentPage + 1)
});

export const isScrolledDown = (e: any) => e.scrollTop + e.clientHeight >= e.scrollHeight;

export const isScrolledUp = (e: any) => e.scrollTop === e.offsetTop;

export const appendEntries = (val: any[]) => {
    val.forEach((v: any) => renderTableRow(v));
};

export const http$ = (url: string) => ajax.get(url);

export const aggregatePages = (acc: { list: any[], page: number }, curr: BeerPage) => {
    if (curr.page.currentPage === 0) {
        acc.list = [];
    }
    if (curr.page.currentPage < acc.page) {
        if (acc.list.length < 3 * 10) {
            const list = [...curr.beers, ...acc.list];
            return {list, page: curr.page.currentPage};
        } else {
            acc.list.splice(acc.list.length - 10, 10);
            const list = [...curr.beers, ...acc.list];
            return {list, page: curr.page.currentPage};
        }
    } else {
        if (acc.list.length < 3 * 10) {
            const list = [...acc.list, ...curr.beers];
            return {list, page: curr.page.currentPage};
        } else {
            acc.list.splice(0, 10);
            const list = [...acc.list, ...curr.beers];
            return {list, page: curr.page.currentPage};
        }
    }
};

export const countPage = (acc: { scrollDirection: 'DOWN' | 'UP', page: number }, curr: { scrollDirection: 'DOWN' | 'UP' }) => {
    if (curr.scrollDirection === 'UP') {
        return {...acc, ...curr, page: acc.page !== 0 ? acc.page - 1 : 0};
    } else {
        return {...acc, ...curr, page: acc.page + 1};
    }
};
