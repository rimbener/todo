import { expect } from 'chai';
import { describe } from 'mocha';
import QueryConstructor from '../src/utils/query-constructor';

function createQuery(mockQuery: any) {
    const whereClause = new QueryConstructor(mockQuery, 'todo');
    if (mockQuery.id) {
        whereClause.addEqualCondition('id');
    }
    if (mockQuery.resolved) {
        whereClause.addEqualCondition('resolved', mockQuery.resolved === 'true' ? true : false);
    }

    if (mockQuery.title) {
        whereClause.addLikeCondition('title', mockQuery.title);
    }

    return whereClause;
}

describe('QueryConstructor', () => {
    it('first query combination', () => {
        const mockQuery = { id: '5' };
        const paramsExpected = { id: '5' };
        const queryExpected = ' todo.id = :id ';
        const result = createQuery(mockQuery);
        expect(result.getQuery()).to.equal(queryExpected);
        expect(result.getParams()).to.eql(paramsExpected);
    });

    it('first query combination', () => {
        const mockQuery = { id: '1', title: 'test' };
        const paramsExpected = { id: '1', title: 'test' };
        const queryExpected = ' todo.id = :id  AND  todo.title like \'%\' || :title || \'%\'';
        const result = createQuery(mockQuery);
        expect(result.getQuery()).to.equal(queryExpected);
        expect(result.getParams()).to.eql(paramsExpected);
    });

    it('first query combination', () => {
        const mockQuery = { id: '1', resolved: 'false' };
        const paramsExpected = { id: '1', resolved: false };
        const queryExpected = ' todo.id = :id  AND  todo.resolved = :resolved ';
        const result = createQuery(mockQuery);
        expect(result.getQuery()).to.equal(queryExpected);
        expect(result.getParams()).to.eql(paramsExpected);
    });

    it('first query combination', () => {
        const mockQuery = { title: 'test', resolved: 'true' };
        const paramsExpected = { title: 'test', resolved: true };
        const queryExpected = ' todo.resolved = :resolved  AND  todo.title like \'%\' || :title || \'%\'';
        const result = createQuery(mockQuery);
        expect(result.getQuery()).to.equal(queryExpected);
        expect(result.getParams()).to.eql(paramsExpected);
    });

    it('first query combination', () => {
        const mockQuery = { id: '1', title: 'test', resolved: 'true' };
        const paramsExpected = { id: '1', title: 'test', resolved: true };
        const queryExpected = ' todo.id = :id  AND  todo.resolved = :resolved  AND  todo.title like \'%\' || :title || \'%\'';
        const result = createQuery(mockQuery);
        expect(result.getQuery()).to.equal(queryExpected);
        expect(result.getParams()).to.eql(paramsExpected);
    });
});
