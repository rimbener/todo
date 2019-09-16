const supertest = require('supertest');
const req = supertest('http://localhost:3000');

describe('/api/todos', () => {
    it('GET respond with 200 ok to /api/todos ', () => req.get('/api/todos').expect(200));
});
