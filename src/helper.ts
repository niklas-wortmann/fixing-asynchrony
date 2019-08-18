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
    const rows = document.getElementsByClassName('.table-data');
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
}
