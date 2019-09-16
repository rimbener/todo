export default class QueryConstructor {
    private query = '';
    private params: any = {};
    private reqQuery: any;
    private table: string;

    constructor(reqQuery: any, table: string) {
        this.reqQuery = reqQuery;
        this.table = table;
    }

    private addCondition(field: string, value?: any) {
        this.query += this.query !== '' ? ' AND ' : '';
        this.params[field] = value !== undefined ? value : this.reqQuery[field];
    }

    public addEqualCondition(field: string, value?: any) {
        this.addCondition(field, value);
        this.query += ` ${this.table}.${field} = :${field} `;
    }

    public addLikeCondition(field: string, value?: any) {
        this.addCondition(field, value);
        this.query += ` ${this.table}.${field} like '%' || :${field} || '%'`;
    }

    public getQuery() {
        return this.query;
    }

    public getParams() {
        return this.params;
    }
}
