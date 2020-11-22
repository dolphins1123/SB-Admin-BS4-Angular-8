export class QueryModel {
    pageSize?: number;
    pageIndex?: number;
    filters?: any;
    // orderBy: string

    // sortBy: string
    constructor() {
        this.pageSize = 10;
        this.pageIndex = 1;
        this.filters = null;
    }
}
